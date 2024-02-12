import OpenAI from 'openai';
import prismadb from './prismadb';
import { Days, IndividualTripData, Trip, UserPreference } from '@prisma/client';
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const TripData = new Map<string, IndividualTripData | null>()
const UserPreferences = new Map<string, UserPreference[] | null>()

const UserDays = new Map<string, Date[] | null>()

export default async function AIGPT(trip: Trip, emails: string[]) {
    for (let email of emails){
        TripData.set(email, await prismadb.individualTripData.findFirst({where:{email}}))
        UserPreferences.set(email, await prismadb.userPreference.findMany({where:{email}}))
        const getTripDateIndividual = await prismadb.individualTripData.findFirst({where: {email}, include: {personal_days: true}})
        const days = getTripDateIndividual?.personal_days.map((p)=> p.day) ?? null
        UserDays.set(email, days)
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
        let prefs = preferences?.map(p => p.name).join(', ')
        preferencesText += `${email}: ${prefs}\n`;
    }

    preferencesText += "In addition, the following days fit respective users"
    for (let [email, date] of UserDays.entries()){
        let dates = date?.map((d)=> d.toDateString())
        preferencesText += `${email}: ${dates?.join(', ')}`
    }

    preferencesText += `Budget: ${trip.budget}. Is the budget splitted? budget split: ${trip.budget_split}. The budget only concerns the accomodation, ingore any other costs.`

    
    const prompt = `Find an optimal hotel for a trip to ${trip.destination}. Return only the hotel name, nothing more. There are currently ${confirmed} guests coming, with possibility of ${not_confirmed} joining too.
    Each user has their preferences, include them in the search. RETURN ONLY THE HOTEL NAME LIKE THIS EXAMPLE "Bristol Hotel Berlin". Do it according to the data you have. Your result will be used in the app, so 
    only retun the hotel name.
    :
    ${preferencesText}
    `
    
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

