import Image from "next/image";
import Navbar from "@/shared/componenets/Navbar";
import Billboard from "@/shared/componenets/Billboard";
import MoviesList from "@/shared/componenets/MoviesList"
import { Fragment } from "react";

export default function Home() {
  return (
    
    <div>
      <Navbar />
      <Billboard/>
      <MoviesList/>

    </div>
  );
}
