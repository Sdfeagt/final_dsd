import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name, ownerId, destination, days, budget, budgetSplit} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }
        if (!ownerId) {
            return new NextResponse("ownerId is required", { status: 400 });
        }
        if (!destination) {
            return new NextResponse("destination is required", { status: 400 });
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
            // Add new trip
            await prismadb.trip.create({
                data:{
                    name,
                    ownerId,
                    destination,
                    days,
                    hotelName: "",
                    budget,
                    budget_split: budgetSplit
                }
            });

        return NextResponse.json({ message: 'Preferences updated successfully' });
    } catch (error) {
        console.log('[PREFERENCES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
