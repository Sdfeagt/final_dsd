import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name, ownerId, cityName, days, budget, budgetSplit} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }
        if (!ownerId) {
            return new NextResponse("ownerId is required", { status: 400 });
        }
        if (!cityName) {
            return new NextResponse("City is required", { status: 400 });
        }
        if (!days) {
            return new NextResponse("days is required", { status: 400 });
        }
        if (!budget) {
            return new NextResponse("budget is required", { status: 400 });
        }
        if (!budgetSplit) {
            return new NextResponse("budgetSplit is required", { status: 400 });
        }
        const trip = await prismadb.trip.create({
                data:{
                    name,
                    ownerId,
                    destination: cityName,
                    days: {
                        create: days.map((day: any) => ({ day: new Date(day) })),
                    },
                    hotelName: "",
                    budget: Array.isArray(budget) ? budget[0] : parseInt(budget, 10),
                    budget_split: budgetSplit,
                    participantsID: {
                        create: [{ participantID: ownerId }]
                    },                    
                }
            });
        await prismadb.individualTripData.create({
            data:{
                tripId: trip.id,
                confirmed: true,
                personal_days: {
                    create: days.map((day: any) => ({ day: new Date(day) })),
                },
                budget: Array.isArray(budget) ? budget[0] : parseInt(budget, 10),
            }
        })
        return NextResponse.json({ message: 'Trip created' });
    } catch (error) {
        console.log('[TRIP_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
