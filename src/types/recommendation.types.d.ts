// types/recommendation.types.ts
export interface IMovieRecommendation {
    title: string;
    year: number;
    genre: string[];
    rating: number;
    duration: number;
    poster: string;
    description: string;
    whyRecommended: string;
}