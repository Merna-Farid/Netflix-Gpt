"use client";
import axios from "axios";
import { useEffect, useState,useMemo } from "react";
import { IMovie } from "@/types/movie.types";
import Movie from "./Movie";
import FavouritesList from "./FavouriteList";

const MoviesList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/movies");
      setMovies(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <div className="px-4 md:px-12 mt-4">
      {movies.length > 0 && (
        <span className="text-white text-lg md:text-xl font-semibold">Top Movies</span>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
        {movies.map((movie) => (
          <Movie key={movie.title} movie={movie} />
        ))}
      </div>
      
    </div>
    <FavouritesList/>
    </div>
  );
};

export default MoviesList;

