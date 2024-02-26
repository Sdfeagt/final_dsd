import AIGPT from "@/lib/AIGPT";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {tripID: string}}) {
    try {
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

        await prismadb.trip.delete({where:{
            id: params.tripID
        }})

        await prismadb.individualTripData.deleteMany({where:
        {
            tripId: params.tripID
        }
        })

        return NextResponse.json(tripbyownerID)

    }
    catch (error) {
        console.log('[TRIP_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


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

    const { tripName, destVal, budget, splitString, tripDays} = await req.json();

    if (!tripName) {
        return new NextResponse("Trip name is required", { status: 400 });
    }
    if (!destVal) {
        return new NextResponse("Destination is required", { status: 400 });
    }
    if (!budget) {
        return new NextResponse("Budget is required", { status: 400 });
    }
    if (!splitString) {
        return new NextResponse("Split is required", { status: 400 });
    }
    if (!tripDays) {
        return new NextResponse("Trip days is required", { status: 400 });
    }

    const trip = await prismadb.trip.update({
        where:{
            ownerId: userId,
            id: params.tripID,
        },
        data: {
            name: tripName,
            destination: destVal,
            budget,
            budget_split: splitString,
            days: {
                create: tripDays.map((day: any) => ({ day: new Date(day) })),
            },
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