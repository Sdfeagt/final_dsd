import {create} from 'zustand';
//CURRENTLY NOT USED
interface ParticipantData {
  name: string;
  preferences: string[];
}
  
  
  interface TripData {
    name: string;
    ownerId: string;
    destination: string;
    participants: ParticipantData[];
    days: Date[];
    budget: number;
  }
  
  interface TripStore {
    tripData: TripData;
    updateTripData: (newData: Partial<TripData>) => void;
  }


const useTripStore = create<TripStore>((set) => ({
  tripData: {
    name: '',
    ownerId: '',
    destination: '',
    participants: [],
    days: [],
    budget: 0,
  },

  updateTripData: (newData) => set((state) => ({
    tripData: { ...state.tripData, ...newData },
  }))}))

  export {useTripStore}