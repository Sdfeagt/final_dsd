import { create } from 'zustand'

// Define the state and actions for your store
interface FriendsState {
    friends: string[];
    addFriend: (newString: string) => void;
    removeFriend: (stringToRemove: string) => void;
    clearFriends: () => void;
}

// Create the store
const useFriendStore = create<FriendsState>((set) => ({
    friends: [], // initial state of the friends
    addFriend: (newString) =>
        set((state) => ({
            friends: [...state.friends, newString],
        })),
    removeFriend: (stringToRemove) =>
        set((state) => ({
            friends: state.friends.filter((string) => string !== stringToRemove),
        })),
    clearFriends: () =>
        set((state) => ({
            friends: []
        }))
}));

export default useFriendStore;
