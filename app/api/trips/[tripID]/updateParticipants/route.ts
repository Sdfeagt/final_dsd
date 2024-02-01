import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {tripID: string}}) {
    try{
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!params.tripID) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }
    
        const tripbyownerID = await prismadb.trip.findFirst({where:{
            ownerId: userId,
            id: params.tripID
        }})

        if(!tripbyownerID){
            return new NextResponse("Unauthorized", { status: 403 });
        }
    
        const { full_emails} = await req.json();
    
        if (!full_emails) {
            return new NextResponse("User mail is required", { status: 400 });
        }
    
        const trip = await prismadb.trip.update({
            where:{
                ownerId: userId,
                id: params.tripID,
            },
            data: {
                participantsEmail:{
                    create: full_emails.map((mail: string) => ({participantEmail: mail}))
                }
            }
        })
    
        return NextResponse.json(trip)
    
    
    }
        catch (error) {
            console.log('[TRIP_PATCH]', error);
            return new NextResponse("Internal error", { status: 500 });
        }
    }