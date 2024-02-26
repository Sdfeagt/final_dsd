
import AIGPT from "@/lib/AIGPT";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function DELETE(req: Request, {params}: {params: {tripID: string, userEmail: string}}) {
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
        },include:{
            participantsEmail: true
        }})

        if(!tripbyownerID){
            return new NextResponse("Unauthorized", { status: 403 });
        }
    
    
        if (!params.userEmail) {
            return new NextResponse("Participant ID is required", { status: 400 });
        }
        const oldList = tripbyownerID.participantsEmail.map((e)=> e.participantEmail)
        const newList = oldList.filter((email) => email !== params.userEmail)
    
        const trip = await prismadb.trip.update({
            where:{
                ownerId: userId,
                id: params.tripID,
            },
            data: {
                participantsEmail:{
                    create: newList.map((mail: string) => ({participantEmail: mail}))
                }
            },
        })
        
        const individualTripData = await prismadb.individualTripData.findFirst({
            where:{
                email: params.userEmail,
                tripId: params.tripID,
            }
        })
        await prismadb.individualTripData.delete({
            where:{
                id: individualTripData?.id
            },
            include:{
                personal_days: true
            }
        })
        const emailsOBJ = await prismadb.individualTripData.findMany({
            where:{
                tripId: params.tripID,
                confirmed: true
            }
        })
        const emails = emailsOBJ.map((email)=> email.email)
    
        await AIGPT(trip, emails)
    
        return NextResponse.json(trip)
    
    
    }
        catch (error) {
            console.log('[TRIP_PATCH]', error);
            return new NextResponse("Internal error", { status: 500 });
        }
}