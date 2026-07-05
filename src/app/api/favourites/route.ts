import serverAuth from "@/lib/serverAuth"
import { NextRequest,NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Users from "@/models/Users"
import Movie from "@/models/Movies"
export async function GET(req:NextRequest){
    try{
        const {currentUser}=await serverAuth()
        await connectToDatabase()
        const user=await Users.findOne(
            {email:currentUser.email}).populate("favourites")
        
        return NextResponse.json(
            {favourites:user.favourites},
            {status:200}
        )
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message:"Internal server error"},
            {status:500}
        )

    }
}