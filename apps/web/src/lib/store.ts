import { create } from "zustand";
import { User, getStoredUser, setStoredUser, clearStoredUser } from "./auth";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: (user: User, token: string) => {
    setStoredUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
    set({ user, error: null });
  },

  logout: () => {
    clearStoredUser();
    set({ user: null });
  },

  hydrate: () => {
    const user = getStoredUser();
    set({ user });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

// UI/Dashboard state
interface DashboardStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
