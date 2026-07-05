"use client";
import { useEffect } from "react";
import useUser from "@/stores/user.store";
import Movie from "./Movie";

interface FavouritesListProps {
  onMovieClick?: (movie: import("@/types/movie.types").IMovie) => void;
}

const FavouritesList = ({ onMovieClick }: FavouritesListProps) => {
  const { favourites, updateFavourites } = useUser();

  useEffect(() => {
    updateFavourites();
  }, []);

  if (favourites.length === 0) return null;

  return (
  <div className="px-4 md:px-12 mt-4">
      <span className="text-white text-lg md:text-xl font-semibold">
        My List
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
        {favourites.map((movie) => (
          <Movie key={movie._id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesList;