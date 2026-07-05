"use client"
import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import InfoModal from "./InfoModal";


const Billboard=()=>{
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
    const videRef = useRef<HTMLVideoElement>(null);
    const [info, setInfo] = useState(false);
    const handleInfoClick = () => {
        setInfo(true)
    }
    const handleVideoPlay = () => {
        if (videRef.current) {
            videRef.current.requestFullscreen()
        }
    }
    const fetchRandomMovie = async () => {
        try {
            const response = await axios.get("/api/movies");
            const movies = response.data;
            const randomIndex = Math.floor(Math.random() * movies.length);
            setRandomMovie(movies[randomIndex]);
            console.log("Random Movie:", movies[randomIndex]);
        }   
    catch (error) {
        console.error("Error fetching random movie:", error);
        // throw new Error("Failed to fetch random movie");

    }}
    useEffect(() => {
        fetchRandomMovie();
    },[])
    return(
        <div className="h-screen">
            <video
            poster={randomMovie?.thumbnailUrl}
            src={randomMovie?.videoUrl} 
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
            ref={videRef}

            />
            <div className="absolute top-1/2 left-10 -translate-y-1/2
            transform flex flex-col gap-4">
                <h1 className="text-white text-5xl nt-bold">
                    {randomMovie?.title}
                </h1>
                <p className="text-white text-[10x] md:text-lg mt-2 md:mt-4 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {randomMovie?.description}
                </p>
                {randomMovie && (
                    <div className="flex gap-3 mt-4">
                    <button className="bg-white text-black rounded-md px-4 py-2 text-sm md:text-lg 
                    font-semibold flex items-center gap-2 hover:bg-[#831010]-text-white transition"
                    onClick={handleVideoPlay}>
                        <Image
                        src="/assets/play.svg"
                        width={24}
                        height={24}
                        alt="play"
                        />
                        Play
                    </button>
                    <button className="bg-[#e50914] text-white rounded-md px-4 py-2 text-sm md:text-lg font-semibold 
                    flex items-center gap-2 hover:bg-[#831010] transition"
                    onClick={handleInfoClick}>
                        More Info
                    </button>
                    {info &&<InfoModal movie={randomMovie} onClose={()=>{setInfo(false)}}/>}                  
                </div>
                )}
                
            </div>
            
        </div>

    )
}
export default Billboard
