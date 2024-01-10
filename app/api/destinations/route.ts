import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request, {params} : {params: {continent: string}}

){
    try{
        const { userId } = auth()

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!params.continent){
            return new NextResponse("Continent is requierd", {status: 400})
        }

        const destinations = await prismadb.destination.findMany({
            where:{
                continent: params.continent,
            }
        })

        return NextResponse.json(destinations)

    }
    catch(error){
        console.log("[DESTINATIONS_GET]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}