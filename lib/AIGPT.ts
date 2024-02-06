import OpenAI from 'openai';
import prismadb from './prismadb';
import { IndividualTripData, Trip, UserPreference } from '@prisma/client';
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const TripData = new Map<string, IndividualTripData | null>()
const UserPreferences = new Map<string, UserPreference[] | null>()


export default async function main(trip: Trip, emails: string[]) {
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

    let userString = []

    let index = 0

    for(let pref of UserPreferences.values()){
        userString[index] = `${pref?.map((email)=> `${email.email}, `)}`
        index++
    }
    
    const prompt = `Find an optimal hotel for a trip to ${trip.destination}. Therea re currently ${confirmed} guests coming, with possibility of ${not_confirmed} joining too.
    Each user has their preferences, include them in the search:
    ${userString.forEach((s)=> `${s}`)}
    `

    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: "system", content: prompt}],
        model: 'gpt-4-turbo',
    });
}

