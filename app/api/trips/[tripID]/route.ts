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
            ownerId: userId
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