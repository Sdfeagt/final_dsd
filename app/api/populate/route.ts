import populateDatabase from "@/lib/populate"
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";


export async function POST() {
  const { userId } = auth()
  if(!userId){
    return new NextResponse("Unauthenticated", {status: 401})
  }
  try {
    await populateDatabase();
    return new NextResponse("Database populated successfully", { status: 200 })
  } catch (error) {
    console.error('Error populating database:', error);
    return new NextResponse("Error populating database", { status: 500 })

  }
}
