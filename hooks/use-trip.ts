import {create} from 'zustand';

interface TripData {
    name: string;
    ownerId: string;
    destinationId: string;
    hotelId: string;
    participants: string[];
  }
  
  interface TripStore {
    tripData: TripData;
    updateTripData: (newData: Partial<TripData>) => void;
  }

const useTripStore = create<TripStore>((set) => ({
  tripData: {
    name: '',
    ownerId: '',
    destinationId: '',
    hotelId: '',
    participants: [],
  },

  updateTripData: (newData) => set((state) => ({
    tripData: { ...state.tripData, ...newData },
  }))}))