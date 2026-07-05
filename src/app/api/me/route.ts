import serverAuth from "@/lib/serverAuth"
import { NextRequest,NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Users from "@/models/Users"
export async function GET(req:NextRequest){
    try{
        const {currentUser}=await serverAuth()
        return NextResponse.json(
            {currentUser},{
                status:200
            }
        )
    }
    catch(error){
        console.log(error)
        NextResponse.json({message:"Internal server error"},
            {status:500}
        )

    }
}