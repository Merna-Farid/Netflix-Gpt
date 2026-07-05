import { connectToDatabase } from "@/lib/db";
import Movie from "@/models/Movies";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
   try{
    await serverAuth();
    await connectToDatabase();
    const movies = await Movie.find();
    return new Response(JSON.stringify(movies), { status: 200 });
   }
   catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
    {
        message: "Failed to fetch movies"
    }, { status: 500 });
   }

}