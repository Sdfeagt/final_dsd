import { User } from "@clerk/nextjs/server";
import { Days, IndividualTripData, Trip } from "@prisma/client";

type ParticipantWithUserDetails = IndividualTripData & {
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    imageUrl: string;
    personal_days: Days[];
    userID: string | null | undefined;
};

export type {ParticipantWithUserDetails}