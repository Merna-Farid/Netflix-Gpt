"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/shared/componenets/Navbar";
import { IMovie } from "@/types/movie.types";
import { Loader2, SearchX, Film } from "lucide-react";

const SearchResults = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";

    const [results, setResults] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        const fetchResults = async () => {
            setIsLoading(true);
            setError("");
            try {
                const { data } = await axios.get("/api/search", {
                    params: { q: query },
                });
                setResults(data);
            } catch (err) {
                console.error("Search failed:", err);
                setError("Something went wrong while searching.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            <Navbar />

            <main className="px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-16">
                <h1 className="text-xl sm:text-2xl font-semibold mb-1">
                    {query ? (
                        <>
                            Results for <span className="text-[#e50914]">&ldquo;{query}&rdquo;</span>
                        </>
                    ) : (
                        "Search"
                    )}
                </h1>
                {!isLoading && !error && query && (
                    <p className="text-sm text-[#999999] mb-6">
                        {results.length} {results.length === 1 ? "result" : "results"} found
                    </p>
                )}

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#e50914]" />
                    </div>
                )}

                {!isLoading && error && (
                    <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3 max-w-md">
                        {error}
                    </p>
                )}

                {!isLoading && !error && query && results.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-[#999999] gap-3">
                        <SearchX className="w-10 h-10" />
                        <p className="text-sm">
                            No matches for &ldquo;{query}&rdquo;. Try a different title or genre.
                        </p>
                    </div>
                )}

                {!isLoading && !error && !query && (
                    <div className="flex flex-col items-center justify-center py-20 text-[#999999] gap-3">
                        <Film className="w-10 h-10" />
                        <p className="text-sm">Search for a title, genre, or mood above.</p>
                    </div>
                )}

                {!isLoading && !error && results.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {results.map((movie) => (
                            <div
                                key={movie._id}
                                className="group cursor-pointer rounded-md overflow-hidden bg-[#1a1a1a] border border-[#262626] hover:border-[#444444] transition-colors"
                            >
                                <div className="aspect-[2/3] bg-[#0d0d0d] relative overflow-hidden">
                                    {movie.thumbnailUrl? (
                                        <img
                                            src={movie.thumbnailUrl}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Film className="w-8 h-8 text-[#444444]" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 sm:p-3">
                                    <p className="text-xs sm:text-sm font-medium truncate">
                                        {movie.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

const SearchPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e50914]" />
                </div>
            }
        >
            <SearchResults />
        </Suspense>
    );
};

export default SearchPage;