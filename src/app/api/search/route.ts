import { connectToDatabase } from "@/lib/db";
import Movie from "@/models/Movies";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request) {
    try {
        await serverAuth();
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q")?.trim();

        if (!query) {
            return new Response(JSON.stringify([]), { status: 200 });
        }

        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ],
        });

        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        console.error("Error searching movies:", error);
        return NextResponse.json(
            {
                message: "Failed to search movies",
            },
            { status: 500 }
        );
    }
}