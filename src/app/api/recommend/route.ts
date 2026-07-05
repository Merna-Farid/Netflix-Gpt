// app/api/recommend/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

function getRetryDelayMs(error: any): number | null {
    // Try to extract Google's suggested retryDelay (e.g. "29s")
    const details = error?.error?.details || error?.details;
    const retryInfo = details?.find((d: any) =>
        d["@type"]?.includes("RetryInfo")
    );
    const retryDelay: string | undefined = retryInfo?.retryDelay;
    if (retryDelay) {
        const seconds = parseFloat(retryDelay.replace("s", ""));
        if (!isNaN(seconds)) return seconds * 1000;
    }
    return null;
}

function isRetryable(error: any) {
    const status = error?.status || error?.error?.code;
    const message = error?.message || "";
    return (
        status === 503 ||
        status === 429 ||
        message.includes("UNAVAILABLE") ||
        message.includes("high demand") ||
        message.includes("RESOURCE_EXHAUSTED") ||
        message.includes("quota")
    );
}

async function generateWithRetry(
    ai: GoogleGenAI,
    model: string,
    contents: any[],
    maxRetries = 2
) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent({ model, contents });
        } catch (error: any) {
            if (isRetryable(error) && attempt < maxRetries) {
                const suggestedDelay = getRetryDelayMs(error);
                const delay = suggestedDelay ?? attempt * 2000;
                console.log(`Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey.trim() === "") {
            return NextResponse.json(
                { error: "Server misconfigured: missing API key" },
                { status: 500 }
            );
        }

        const { movies, preferences } = await req.json();

        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-2.5-flash-lite";

        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: `Here is a list of movies:
${JSON.stringify(movies, null, 3)}

User preferences: ${JSON.stringify(preferences, null, 2)}

Pick the single best matching movie from the list above based on the preferences.
Respond ONLY with valid JSON (no markdown, no backticks, no preamble) matching this exact shape:

{
  "title": "string",
  "year": number,
  "genre": ["string"],
  "rating": number,
  "duration": number,
  "poster": "string (poster/image url from the movie list if available, otherwise empty string)",
  "description": "string (2-3 sentence plot summary)",
  "whyRecommended": "string (2-3 sentences on why this fits the user's preferences)"
}`,
                    },
                ],
            },
        ];

        const response = await generateWithRetry(ai, model, contents);

        const rawText =
            response?.text ||
            response?.candidates?.[0]?.content?.parts
                ?.map((part) => part.text ?? "")
                .join("\n") ||
            "";

        let parsed;
        try {
            const cleaned = rawText.replace(/```json|```/g, "").trim();
            parsed = JSON.parse(cleaned);
        } catch {
            console.error("Failed to parse Gemini JSON response:", rawText);
            return NextResponse.json(
                { error: "Received an unexpected response format. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({ recommendation: parsed });
    } catch (error: any) {
        console.error("Gemini recommendation error:", error);

        const status = error?.status || error?.error?.code;
        const isQuota = status === 429 || error?.message?.includes("RESOURCE_EXHAUSTED");
        const is503 = status === 503;

        return NextResponse.json(
            {
                error: isQuota
                    ? "You've hit the free-tier request limit for now. Please wait a bit and try again."
                    : is503
                    ? "Gemini is experiencing high demand right now. Please try again in a moment."
                    : error instanceof Error
                    ? error.message
                    : "Failed to generate recommendation",
            },
            { status: isQuota ? 429 : is503 ? 503 : 500 }
        );
    }
}