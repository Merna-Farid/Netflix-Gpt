import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogFooter,
} from "../ui/Dialog";
import RecommendationModal from "./RecommendationModal";
import { Film, Loader2 } from "lucide-react";
import { Slider } from "../ui/Slider";
import { Badge } from "../ui/Badge";
import { useEffect, useState } from "react";
import { GENRES, MOODS } from "@/constants";
import { cn } from "@/lib/utils";
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import { IMovieRecommendation } from "@/types/recommendation.types";

interface INetflixGptModalProps {
    isNetflixGptOpen: boolean;
    setNetflixGptOpen: (isOpen: boolean) => void;
}

const NetflixGptModal = ({
    isNetflixGptOpen,
    setNetflixGptOpen,
}: INetflixGptModalProps) => {
    const [duration, setDuration] = useState<number[]>([10]);
    const [rating, setRating] = useState<number[]>([6]);
    const [isSelectedMoods, setIsSelectedMoods] = useState<string[]>([]);
    const [isSelectedGenres, setIsSelectedGenres] = useState<string[]>([]);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [recommendation, setRecommendation] = useState<IMovieRecommendation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

    const toggleMood = (mood: string) => {
        setIsSelectedMoods((prev) =>
            prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
        );
    };

    const toggleGenre = (genre: string) => {
        setIsSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handleRecommendedMovie = async () => {
        setIsLoading(true);
        setError("");
        setRecommendation(null);
        try {
            const preferences = {
                genre: isSelectedGenres,
                minDuration: duration[0],
                minRating: rating[0],
                mood: isSelectedMoods,
            };

            const { data } = await axios.post("/api/recommend", {
                movies,
                preferences,
            });

            setRecommendation(data.recommendation);
            setIsRecommendationOpen(true);
        } catch (err) {
            console.error("Failed to get movie recommendation:", err);
            const message = axios.isAxiosError(err)
                ? err.response?.data?.error || err.message
                : "Something went wrong while getting your recommendation.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            setMovies(data);
        } catch (err) {
            console.error("Failed to fetch movies:", err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleCancel = () => {
        setNetflixGptOpen(false);
    };

    return (
        <>
            <Dialog open={isNetflixGptOpen} onOpenChange={setNetflixGptOpen}>
                <DialogContent
                    className="
               bg-[#1a1a1a] max-w-2xl! w-full gap-10
               overflow-y-auto text-white border-[#333333]"
                >
                    <DialogHeader>
                        <DialogTitle className="mb-2 flex gap-2 items-center text-2xl font-bold">
                            <Film className="w-6 h-6 text-[#ff0000]" />
                            Find your perfect Movie
                        </DialogTitle>
                        <DialogDescription className="text-[#999999]">
                            Adjust your prefrences
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-5">
                        <div className="flex gap-4 flex-col">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-[#f2f2f2]">
                                    Duration Range
                                </label>
                                <span className="text-sm text-[#999]">{duration[0]} min</span>
                            </div>
                            <Slider
                                max={15}
                                step={0.5}
                                minStepsBetweenThumbs={1}
                                value={duration}
                                onValueChange={setDuration}
                            />
                        </div>

                        <div className="flex gap-4 flex-col">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-[#f2f2f2]">
                                    Minimum rating
                                </label>
                                <span className="text-sm text-[#999]">{rating[0]}/10</span>
                            </div>
                            <Slider
                                max={10}
                                step={0.5}
                                minStepsBetweenThumbs={1}
                                value={rating}
                                onValueChange={setRating}
                            />
                        </div>

                        <div className="flex flex-col gap-4 mt-3">
                            <label className="text-sm font-semibold text-[#f2f2f2]">
                                Select mood
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {MOODS.map((mood) => {
                                    const isSelected = isSelectedMoods.includes(mood);
                                    return (
                                        <Badge
                                            key={mood}
                                            variant="outline"
                                            onClick={() => toggleMood(mood)}
                                            className={cn(
                                                "cursor-pointer select-none rounded-full px-4 py-1.5 text-sm font-medium",
                                                "border transition-all duration-200 ease-out",
                                                "hover:scale-105 active:scale-95",
                                                isSelected
                                                    ? "border-red-500 bg-red-500 text-white shadow-sm shadow-red-500/30"
                                                    : "border-muted-foreground/20 bg-transparent text-white hover:border-red-300 hover:text-red-500"
                                            )}
                                        >
                                            {mood}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-3">
                            <label className="text-sm font-semibold text-[#f2f2f2]">
                                Select genre
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => {
                                    const isSelected = isSelectedGenres.includes(genre);
                                    return (
                                        <Badge
                                            key={genre}
                                            variant="outline"
                                            onClick={() => toggleGenre(genre)}
                                            className={cn(
                                                "cursor-pointer select-none rounded-full px-4 py-1.5 text-sm font-medium",
                                                "border transition-all duration-200 ease-out",
                                                "hover:scale-105 active:scale-95",
                                                isSelected
                                                    ? "border-red-500 bg-red-500 text-white shadow-sm shadow-red-500/30"
                                                    : "border-muted-foreground/20 bg-transparent text-white hover:border-red-300 hover:text-red-500"
                                            )}
                                        >
                                            {genre}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="flex gap-6 mt-6 bg-[#1a1a1a]">
                        <button
                            className="cursor-pointer glow-red bg-[#141414] font-medium text-sm py-2 px-4 border border-[#262626] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            className="cursor-pointer glow-red bg-[#ff0000] font-medium text-sm py-2 px-4 rounded-[10px] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleRecommendedMovie}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isLoading ? "Generating..." : "Generate Recommendations"}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <RecommendationModal
                recommendation={recommendation}
                isOpen={isRecommendationOpen}
                setIsOpen={setIsRecommendationOpen}
            />
        </>
    );
};

export default NetflixGptModal;