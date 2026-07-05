// import { connectToDatabase } from "@/lib/db"
// import serverAuth from "@/lib/serverAuth"
// import Movie from "@/models/Movies"
// import Users from "@/models/Users"
// import { User } from "lucide-react"
// import { NextRequest,NextResponse } from "next/server"

// export async function POST(req:NextRequest){
//     try{
//         const {currentUser}=await serverAuth()
//         await connectToDatabase()
//         const { id: movieId } = await req.json()
//         const isMovieExist=await Movie.findById(movieId)

//         if(!isMovieExist){
//             return NextResponse.json(
//                 {message:"Invalid movie id"},
//                 {status:400}

//             )
//         }
//         await Users.updateOne(
//             {email:currentUser.email},
//             {$addToSet:{favourites:movieId}}
//         )
//         return NextResponse.json(
//             {message:"Movie added to favourites"},
//             {status:200}
//         )
//     }
//     catch(error){
//         console.log(error)
//         return NextResponse.json({message:"Internal server error"},
//             {status:500}
//         )

//     }
// }

// export async function DELETE(req:NextRequest){
//     try{
//         const {currentUser}=await serverAuth()
//         await connectToDatabase()
//         const {movieId}=await req.json()
//         const isMovieExist=await Movie.findById(movieId)

//         if(!isMovieExist){
//             return NextResponse.json(
//                 {message:"Invalid movie id"},
//                 {status:400}

//             )
//         }
//         await Users.updateOne(
//             {email:currentUser.email},
//             {$pull:{favourites:movieId}}
//         )
//         return NextResponse.json(
//             {message:"Movie added to favourites"},
//             {status:200}
//         )
//     }
//     catch(error){
//         console.log(error)
//         NextResponse.json({message:"Internal server error"},
//             {status:500}
//         )

//     }
// }

import serverAuth from "@/lib/serverAuth"
import { connectToDatabase } from "@/lib/db"
import Movie from "@/models/Movies"
import Users from "@/models/Users"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

// export async function POST(req: NextRequest) {
//   try {
   
//     const { currentUser } = await serverAuth()
//     await connectToDatabase()
//     const { id: movieId } = await req.json()
//      if (!mongoose.Types.ObjectId.isValid(movieId)) {
//         return NextResponse.json({ message: "Invalid movie id format" }, { status: 400 });
//         }
//     const isMovieExist = await Movie.findById(movieId)
//     if (!isMovieExist) {
//       return NextResponse.json({ message: "Invalid movie id" }, { status: 400 })
//     }

//     await Users.updateOne(
//       { email: currentUser.email },
//       { $addToSet: { favourites: movieId } }
//     )
    

//     return NextResponse.json({ message: "Movie added to favourites" }, { status: 200 })
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }
export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth()
    await connectToDatabase()
    const { id: movieId } = await req.json()

    const isMovieExist = await Movie.findById(movieId)
    if (!isMovieExist) {
      return NextResponse.json({ message: "Invalid movie id" }, { status: 400 })
    }

    console.log("currentUser.email:", currentUser.email)
    console.log("movieId:", movieId)

    const result = await Users.updateOne(
      { email: currentUser.email },
      { $addToSet: { favourites: movieId } }
    )


    return NextResponse.json({ message: "Movie added to favourites" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth()
    await connectToDatabase()
    const { id: movieId } = await req.json()

    const isMovieExist = await Movie.findById(movieId)
    if (!isMovieExist) {
      return NextResponse.json({ message: "Invalid movie id" }, { status: 400 })
    }

    await Users.updateOne(
      { email: currentUser.email },
      { $pull: { favourites: movieId } }
    )

    return NextResponse.json({ message: "Movie removed from favourites" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}