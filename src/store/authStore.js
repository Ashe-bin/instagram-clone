import { create } from "zustand";

const useAuthStore = create((set) => ({
  // defining the initial state and action of the store.
  user: JSON.parse(localStorage.getItem("user-info")),
  login: (user) => set({ user }), // the login: Action -- updates the user with the provided user object.
  logout: () => set({ user: null }), // Action: logout resets the user state back to null
  setUser: (user) => set({ user }), // Explicit action to set the user state to a specific value.
}));
export default useAuthStore;
// the store contains user state and action of login, logout, setUser to modify the user state.
