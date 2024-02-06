import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const {preferences, email} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!preferences || !preferences.length) {
            return new NextResponse("Preferences are required", { status: 400 });
        }
        
            // Delete existing preferences for the user
            await prismadb.userPreference.deleteMany({
                where: { 
                    email: email
                },
            });

            // Add new preferences
            await prismadb.userPreference.createMany({
                data: preferences.map((pref: string) => ({ name: pref, email: email})),
            });

        return NextResponse.json({ message: 'Preferences updated successfully' });
    } catch (error) {
        console.log('[PREFERENCES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}