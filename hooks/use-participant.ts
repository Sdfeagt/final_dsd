import {create} from 'zustand';

interface ParticipantData {
  name: string;
  preferences: string[];
}

interface ParticipantStore {
    participantData: ParticipantData;
    updateParticipantData: (newData: Partial<ParticipantData>) => void;
  }


  const useParticipantStore = create<ParticipantStore>((set)=>({
    participantData: {
    name: '',
    preferences: [],
    },

    updateParticipantData: (newData) => set((state) => ({
      participantData: { ...state.participantData, ...newData },
    }))

  }))

  export {useParticipantStore}