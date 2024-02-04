import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {tripID: string, userEmail: string}}) {
    try{
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!params.tripID) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }
        if (!params.userEmail) {
            return new NextResponse("User mail is required", { status: 400 });
        }
        const {trip_days, budget } = await req.json();
    
        if (!trip_days) {
            return new NextResponse("Trip days is required", { status: 400 });
        }
        if (!budget) {
            return new NextResponse("Budget is required", { status: 400 });
        }
        const userTripDetails = await prismadb.individualTripData.findFirst({where:{
            tripId: params.tripID,
            email: params.userEmail
        }})
        if(!userTripDetails){
            return new NextResponse("Unauthorized", { status: 403 });
        }
    
        const updated = await prismadb.individualTripData.update({
            where:{
                id: userTripDetails.id
            },
            data:{
                confirmed: true,
                budget: Array.isArray(budget) ? budget[0] : parseInt(budget, 10),
                personal_days:{
                    create: trip_days.map((day: any) => ({ day: new Date(day) })),
                },
            }
        })
    //TODO: GPT hotel find again. GPT find optimal days and hotel. Then update the trip
        return NextResponse.json(updated)
    
    
    }
        catch (error) {
            console.log('[PARTICIPANTUPDATE_PATCH]', error);
            return new NextResponse("Internal error", { status: 500 });
        }
}

export async function DELETE(req: Request, {params}: {params: {tripID: string, userEmail: string}}) {
    try{
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!params.tripID) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }
        if (!params.userEmail) {
            return new NextResponse("User mail is required", { status: 400 });
        }
        console.log("Check 1");

        const userTripDetails = await prismadb.individualTripData.findFirst({where:{
            tripId: params.tripID,
            email: params.userEmail
        }})
        if(!userTripDetails){
            return new NextResponse("Unauthorized", { status: 403 });
        }       
        console.log("Check 2");
         console.log("User trip data: " + userTripDetails.id);

        const updated = await prismadb.individualTripData.delete({
            where:{
                id: userTripDetails.id
            },
        })
        const tripUpdate = await prismadb.trip.findUnique({
            where:{
                id: params.tripID
            },
            include:{
                participantsEmail: true
            }
        })
        if(!tripUpdate){
            return new NextResponse("Trip not found!", { status: 400 });
        }
        console.log("Check 3");
        const newEmails = tripUpdate.participantsEmail.filter((mail)=> mail.participantEmail !== params.userEmail).map((email)=>email.participantEmail)
        const updatedTrip = await prismadb.trip.update({
            where: {
                id: params.tripID
            },
            data:{
                participantsEmail:{
                    create: newEmails.map((email: string) => ({participantEmail: email}))
                }
            },
            include:{
                participantsEmail: true
            }
        })
        const emailOBJ = await prismadb.participantsEmail.findFirst({
            where:{
                tripId: params.tripID,
                participantEmail: params.userEmail
            }
        })
        if(!emailOBJ){
            return new NextResponse("Email not found!", { status: 400 });
        }
        console.log("Check 4");
        await prismadb.participantsEmail.delete({
            where:{
                id: emailOBJ.id
            }
        })
        console.log("New list of emails: " + updatedTrip.participantsEmail.map((e)=>e.participantEmail));
    //TODO: GPT hotel find again. GPT find optimal days and hotel. Then update the trip
        return NextResponse.json(updated)
    
    
    }
        catch (error) {
            console.log('[PARTICIPANTUPDATE_DELETE]', error);
            return new NextResponse("Internal error", { status: 500 });
        }
}