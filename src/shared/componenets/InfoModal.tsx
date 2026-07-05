"use client";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef,useMemo } from "react";
import Image from "next/image";
import { IMovie } from "@/types/movie.types";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlay,FaPlus,FaCheck } from "react-icons/fa";
import useUser from "@/stores/user.store";
import axios from "axios";

interface InfoModalProps {
  movie: IMovie | null;
  onClose: () => void;
}

const InfoModal = ({ movie, onClose }: InfoModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {user,favourites,updateUser,updateFavourites}=useUser()  

    const isFavourite = useMemo(() => {
      if (!movie || !favourites) return false;
      return favourites.some(fav => fav._id === movie._id);
    }, [favourites, movie]);


  useEffect(() => {
    setMounted(true);
  }, []);


  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  async function toggleFavourites(id:string){
    try{
      if(isFavourite){
        await axios.delete("/api/favourite", {
          data: {
              id,
          },
});
      }else{
         await axios.post("/api/favourite",{id})
         
      }
      await updateFavourites();
      await updateUser();
    }
    catch(error){
      console.log(error)
    }

  }
  
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
      videoRef.current.requestFullscreen?.().catch(() => {
        
      });
    }
  }, [isPlaying]);

  if (!movie || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-md overflow-hidden bg-[#181818]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[400px]">
          {isPlaying ? (
            <video
              ref={videoRef}
              src={movie.videoUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />
            </>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 rounded-full p-2 cursor-pointer hover:bg-black z-10"
            aria-label="Close"
          >
            <AiOutlineClose className="text-white w-5 h-5" />
          </button>

          {!isPlaying && (
    
              <div className="absolute bottom-6 left-6 flex flex-col gap-3">
              <h1 className="text-white text-3xl md:text-4xl font-bold">{movie.title}</h1>
              <button
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold w-fit hover:bg-white/80"
                onClick={handleVideoPlay}
              >
                <FaPlay className="w-4 h-4" /> Play
              </button>
             
              </div>
            
          )}
        </div>

        {!isPlaying && (
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500 font-semibold">{movie.rating} Rating</span>
              <span className="text-white/70">{movie.duration}</span>
              <span className="text-white/70">{movie.genre}</span>
              <span className="text-white/70">{movie.mood}</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white"
              onClick={()=>{
                toggleFavourites(movie._id)
              }}>
              {isFavourite ? <FaCheck className="text-white" /> : <FaPlus className="text-white" />}
            </button>
            </div>
            <p className="text-white/90">{movie.description}</p>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default InfoModal;