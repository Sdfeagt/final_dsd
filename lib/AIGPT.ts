import OpenAI from 'openai';
import prismadb from './prismadb';
import { IndividualTripData, Trip, UserPreference } from '@prisma/client';
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const TripData = new Map<string, IndividualTripData | null>()
const UserPreferences = new Map<string, UserPreference[] | null>()


export default async function AIGPT(trip: Trip, emails: string[]) {
    for (let email of emails){
        TripData.set(email, await prismadb.individualTripData.findFirst({where:{email}}))
        UserPreferences.set(email, await prismadb.userPreference.findMany({where:{email:email}}))
    }
    let confirmed = 0
    let not_confirmed = 0

    for (let data of TripData.values()){
        if(data?.confirmed){
            confirmed ++
        }
        else{
            not_confirmed ++
        }
    }

    let preferencesText = '';
    for (let [email, preferences] of UserPreferences.entries()) {
        let prefs = preferences?.map(p => p.name).join(', ');
        preferencesText += `${email}: ${prefs}\n`;
    }

    
    const prompt = `Find an optimal hotel for a trip to ${trip.destination}. Return only the hotel name, nothing more. There are currently ${confirmed} guests coming, with possibility of ${not_confirmed} joining too.
    Each user has their preferences, include them in the search:
    ${preferencesText}
    `

    console.log(prompt);

    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: "system", content: prompt}],
        model: 'gpt-4-turbo-preview',
    });

    console.log("Anwser: " + chatCompletion.choices[0].message.content);

    await prismadb.trip.update({
        where:{
            id: trip.id
        },
        data:{
            hotelName: chatCompletion.choices[0].message.content ?? ""
        }
    })

}

