import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogDescription,
} from "../ui/Dialog";
import { Sparkles, Copy, Check, Star, Clock, Film } from "lucide-react";
import { useState } from "react";
import { IMovieRecommendation } from "@/types/recommendation.types";

interface IRecommendationModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    recommendation: IMovieRecommendation | null;
}

const RecommendationModal = ({
    isOpen,
    setIsOpen,
    recommendation,
}: IRecommendationModalProps) => {
    const [copied, setCopied] = useState(false);

    if (!recommendation) return null;

    const handleCopy = async () => {
        try {
            const text = `${recommendation.title} (${recommendation.year})\n\n${recommendation.description}\n\nWhy this pick: ${recommendation.whyRecommended}`;
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-[#1a1a1a] sm:max-w-2xl text-white border-[#333333] gap-0 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
               <div className="relative bg-gradient-to-br from-[#2a1010] via-[#1a1a1a] to-[#1a1a1a] px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-[#333333]">
                    <DialogHeader>
                        <DialogTitle className="flex gap-2 items-center text-xs sm:text-sm font-semibold text-[#ff0000] uppercase tracking-wide">
                            <Sparkles className="w-4 h-4 shrink-0" />
                            Your Pick
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Movie recommendation based on your preferences
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-3">
    {recommendation.poster ? (
        <img
            src={recommendation.poster}
            alt={recommendation.title}
            className="w-20 h-28 sm:w-24 sm:h-36 object-cover rounded-md border border-[#333333] shrink-0 bg-[#141414] mx-auto xs:mx-0"
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
            }}
        />
    ) : (
        <div className="w-20 h-28 sm:w-24 sm:h-36 rounded-md border border-[#333333] shrink-0 bg-[#141414] flex items-center justify-center mx-auto xs:mx-0">
            <Film className="w-6 h-6 sm:w-8 sm:h-8 text-[#666666]" />
        </div>
    )}

    <div className="flex flex-col justify-center gap-1.5 sm:gap-2 min-w-0 text-center xs:text-left items-center xs:items-start">
        <h2 className="text-lg sm:text-2xl font-bold leading-tight w-full truncate">
            {recommendation.title}
        </h2>
        <span className="text-xs sm:text-sm text-[#999999]">{recommendation.year}</span>

        <div className="flex flex-wrap items-center justify-center xs:justify-start gap-1.5 sm:gap-2 mt-1">
            <span className="flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-[#141414] border border-[#333333] rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
                {recommendation.rating}/10
            </span>
            <span className="flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-[#141414] border border-[#333333] rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1">
                <Clock className="w-3 h-3 text-[#999999] shrink-0" />
                {recommendation.duration} min
            </span>
        </div>

        <div className="flex flex-wrap justify-center xs:justify-start gap-1 sm:gap-1.5 mt-1">
            {recommendation.genre?.map((g) => (
                <span
                    key={g}
                    className="text-[11px] sm:text-xs font-medium text-[#f2f2f2] bg-red-500/10 border border-red-500/30 rounded-full px-2 sm:px-2.5 py-0.5"
                >
                    {g}
                </span>
            ))}
        </div>
    </div>
</div>
                </div>

                                {/* Body */}
                <div className="px-5 sm:px-8 py-5 sm:py-7 flex flex-col gap-5 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto">
                    <div>
                        <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wide mb-2">
                            Overview
                        </h3>
                        <p className="text-sm leading-relaxed text-[#f2f2f2]">
                            {recommendation.description}
                        </p>
                    </div>

                    <div className="rounded-md border border-red-500/20 bg-red-500/5 p-4 sm:p-5">
                        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#ff4d4d] uppercase tracking-wide mb-2">
                            <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            Why this pick
                        </h3>
                        <p className="text-sm leading-relaxed text-[#f2f2f2]">
                            {recommendation.whyRecommended}
                        </p>
                    </div>
                </div>

                {/* Footer */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 px-5 sm:px-8 pb-6 sm:pb-8 pt-3">
                    <button
                        onClick={handleCopy}
                        className="cursor-pointer flex items-center justify-center gap-1.5 bg-[#141414] border border-[#333333] hover:border-[#444444] transition-colors font-medium text-sm py-2.5 px-4 rounded-[10px] w-full sm:w-auto"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-500" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer glow-red bg-[#ff0000] font-medium text-sm py-2.5 px-4 rounded-[10px] w-full sm:flex-1"
                    >
                        Got it
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendationModal;