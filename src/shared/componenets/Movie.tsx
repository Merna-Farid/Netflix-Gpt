// "use client";
// import axios from "axios";
// import { useEffect, useRef, useState, useMemo } from "react";
// import Image from "next/image";
// import useUser from "@/stores/user.store";
// import {
//   FaPlay,
//   FaPlus,
//   FaChevronDown,
//   FaCheck
// } from "react-icons/fa";
// import { IMovie } from "@/types/movie.types";
// import InfoModal from "./InfoModal";

// interface MovieProps {
//   movie: IMovie;
//   onClick?: (movie: IMovie) => void;
// }

// export default function Movie({ movie, onClick }: MovieProps) {
//   const [preview, setPreview] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [info, setInfo] = useState(false);

//   const hoverTimeout = useRef<NodeJS.Timeout>();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const { user, favourites, updateUser, updateFavourites } = useUser();

//   const isFavourite = useMemo(() => {
//     if (!movie || !favourites) return false;
//     return favourites.some((fav) => fav._id === movie._id);
//   }, [favourites, movie]);

//   async function toggleFavourites(id: string) {
//     try {
//       if (isFavourite) {
//         await axios.delete("/api/favourite", { data: { id } });
//       } else {
//         await axios.post("/api/favourite", { id });
//       }
//       await updateFavourites();
//       await updateUser();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleMouseEnter = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setPreview(true);
//     }, 500);
//   };

//   const handleMouseLeave = () => {
//     if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
//     setPreview(false);

//     if (!isPlaying && videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//   };

//   useEffect(() => {
//     if (preview && !isPlaying && videoRef.current) {
//       videoRef.current.muted = true;
//       videoRef.current.loop = true;
//       videoRef.current.play().catch(() => {});
//     }
//   }, [preview, isPlaying]);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         if (videoRef.current) {
//           videoRef.current.pause();
//           videoRef.current.currentTime = 0;
//         }
//         setIsPlaying(false);
//         setPreview(false);
//       }
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     if (!videoRef.current) return;

//     try {
//       setIsPlaying(true);
//       videoRef.current.muted = false;
//       videoRef.current.loop = false;
//       videoRef.current.controls = true;
//       await videoRef.current.play();

//       if (videoRef.current.requestFullscreen) {
//         await videoRef.current.requestFullscreen();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onClick={() => onClick?.(movie)}
//         className="group relative aspect-video cursor-pointer overflow-visible 
//                    transition-all duration-300 
//                    md:hover:scale-110 lg:hover:scale-[1.3] md:hover:z-50"
//       >
//         <div className="rounded-md overflow-hidden bg-[#181818] shadow-2xl">
//           {/* Media */}
//           <div className="relative aspect-video">
//             <Image
//               src={movie.thumbnailUrl}
//               alt={movie.title}
//               fill
//               className={`object-cover transition-opacity duration-300 ${
//                 preview || isPlaying ? "opacity-0" : "opacity-100"
//               }`}
//               sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 18vw"
//             />

//             <video
//               ref={videoRef}
//               src={movie.videoUrl}
//               playsInline
//               className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
//                 preview || isPlaying ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           </div>

//           {/* Bottom info panel — hidden entirely on small screens, shown on md+ hover */}
//           <div
//             className="hidden md:block absolute left-0 right-0 top-full
//                        bg-[#181818] rounded-b-md px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3
//                        opacity-0 invisible translate-y-2
//                        transition-all duration-300
//                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
//           >
//             <div className="mb-3 md:mb-4 flex items-center justify-between">
//               <div className="flex gap-1.5 md:gap-2">
//                 <button
//                   onClick={handlePlay}
//                   className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white hover:scale-110 transition"
//                 >
//                   <FaPlay className="ml-0.5 text-black text-xs md:text-base" />
//                 </button>

//                 <button
//                   className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white"
//                   onClick={() => {
//                     toggleFavourites(movie._id);
//                   }}
//                 >
//                   {isFavourite ? (
//                     <FaCheck className="text-white text-xs md:text-base" />
//                   ) : (
//                     <FaPlus className="text-white text-xs md:text-base" />
//                   )}
//                 </button>
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setInfo(true);
//                 }}
//                 className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white"
//               >
//                 <FaChevronDown className="text-white text-xs md:text-base" />
//               </button>
//             </div>

//             <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm mb-2">
//               <span className="font-semibold text-[#46d369]">
//                 {Math.floor(movie.rating * 10)}% Match
//               </span>
//               <span className="border border-gray-500 px-1 text-[10px] md:text-xs text-gray-300">
//                 TV-14
//               </span>
//               <span className="text-gray-300">{movie.duration}</span>
//               <span className="border border-gray-500 px-1 text-[10px] md:text-xs text-gray-300">
//                 HD
//               </span>
//             </div>

//             <h3 className="text-white font-semibold text-sm md:text-base mb-1 md:mb-2 line-clamp-1">
//               {movie.title}
//             </h3>

//             <p className="text-[11px] md:text-xs text-gray-300 line-clamp-1">
//               {movie.genre}
//             </p>
//           </div>
//         </div>
//       </div>

//       {info && <InfoModal movie={movie} onClose={() => setInfo(false)} />}
//     </>
//   );
// }
"use client";
import axios from "axios";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import useUser from "@/stores/user.store";
import {
  FaPlay,
  FaPlus,
  FaChevronDown,
  FaCheck
} from "react-icons/fa";
import { IMovie } from "@/types/movie.types";
import InfoModal from "./InfoModal";

interface MovieProps {
  movie: IMovie;
  onClick?: (movie: IMovie) => void;
}

export default function Movie({ movie, onClick }: MovieProps) {
  const [preview, setPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [info, setInfo] = useState(false);
  const [touchActive, setTouchActive] = useState(false); // mobile tap-to-reveal state

  const hoverTimeout = useRef<NodeJS.Timeout>();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user, favourites, updateUser, updateFavourites } = useUser();

  const isFavourite = useMemo(() => {
    if (!movie || !favourites) return false;
    return favourites.some((fav) => fav._id === movie._id);
  }, [favourites, movie]);

  async function toggleFavourites(id: string) {
    try {
      if (isFavourite) {
        await axios.delete("/api/favourite", { data: { id } });
      } else {
        await axios.post("/api/favourite", { id });
      }
      await updateFavourites();
      await updateUser();
    } catch (error) {
      console.log(error);
    }
  }

  // Desktop hover
  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setPreview(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setPreview(false);

    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (preview && !isPlaying && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  }, [preview, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setPreview(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Close the touch-revealed panel when tapping anywhere outside this card
  useEffect(() => {
    if (!touchActive) return;

    const handleOutsideTap = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTouchActive(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideTap);
    document.addEventListener("click", handleOutsideTap);

    return () => {
      document.removeEventListener("touchstart", handleOutsideTap);
      document.removeEventListener("click", handleOutsideTap);
    };
  }, [touchActive]);

  const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    try {
      setIsPlaying(true);
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      videoRef.current.controls = true;
      await videoRef.current.play();

      if (videoRef.current.requestFullscreen) {
        await videoRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handles the card tap on touch devices: first tap reveals the panel,
  // doesn't immediately fire onClick (open modal) like desktop click does
  const handleCardTap = () => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouchDevice) {
      setTouchActive((prev) => !prev);
    } else {
      onClick?.(movie);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardTap}
        className={`group relative aspect-video cursor-pointer overflow-visible 
                   transition-all duration-300 
                   active:scale-95 md:active:scale-100
                   md:hover:scale-110 lg:hover:scale-[1.3] md:hover:z-50
                   ${touchActive ? "scale-110 z-50" : ""}`}
      >
        <div className="rounded-md overflow-hidden bg-[#181818] shadow-2xl">
          {/* Media */}
          <div className="relative aspect-video">
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                preview || isPlaying ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 18vw"
            />

            <video
              ref={videoRef}
              src={movie.videoUrl}
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                preview || isPlaying ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Info panel — shows on desktop hover OR mobile tap (touchActive) */}
          <div
            className={`absolute left-0 right-0 top-full
                       bg-[#181818] rounded-b-md px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3
                       transition-all duration-300
                       ${
                         touchActive
                           ? "opacity-100 visible translate-y-0"
                           : "opacity-0 invisible translate-y-2 md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0"
                       }`}
          >
            <div className="mb-3 md:mb-4 flex items-center justify-between">
              <div className="flex gap-1.5 md:gap-2">
                <button
                  onClick={handlePlay}
                  className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white hover:scale-110 transition"
                >
                  <FaPlay className="ml-0.5 text-black text-xs md:text-base" />
                </button>

                <button
                  className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourites(movie._id);
                  }}
                >
                  {isFavourite ? (
                    <FaCheck className="text-white text-xs md:text-base" />
                  ) : (
                    <FaPlus className="text-white text-xs md:text-base" />
                  )}
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setInfo(true);
                }}
                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white"
              >
                <FaChevronDown className="text-white text-xs md:text-base" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm mb-2">
              <span className="font-semibold text-[#46d369]">
                {Math.floor(movie.rating * 10)}% Match
              </span>
              <span className="border border-gray-500 px-1 text-[10px] md:text-xs text-gray-300">
                TV-14
              </span>
              <span className="text-gray-300">{movie.duration}</span>
              <span className="border border-gray-500 px-1 text-[10px] md:text-xs text-gray-300">
                HD
              </span>
            </div>

            <h3 className="text-white font-semibold text-sm md:text-base mb-1 md:mb-2 line-clamp-1">
              {movie.title}
            </h3>

            <p className="text-[11px] md:text-xs text-gray-300 line-clamp-1">
              {movie.genre}
            </p>
            <p className="text-[11px] md:text-xs text-gray-300 line-clamp-1">
              {movie.mood}
            </p>
          </div>
        </div>
      </div>

      {info && <InfoModal movie={movie} onClose={() => setInfo(false)} />}
    </>
  );
}