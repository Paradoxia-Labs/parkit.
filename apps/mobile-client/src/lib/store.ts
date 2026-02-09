import { create } from "zustand";
import { User, getStoredUser, getStoredToken } from "./auth";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setUser: (user: User, token: string) => {
    set({ user, token, error: null });
  },

  logout: () => {
    set({ user: null, token: null });
  },

  hydrate: async () => {
    try {
      const user = await getStoredUser();
      const token = await getStoredToken();
      set({ user, token });
    } catch (error) {
      console.error("Hydration error:", error);
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

// Booking & ticket state
interface BookingStore {
  selectedVehicleId: string | null;
  selectedParkingId: string | null;
  selectVehicle: (id: string) => void;
  selectParking: (id: string) => void;
  clearSelection: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedVehicleId: null,
  selectedParkingId: null,
  selectVehicle: (id: string) => set({ selectedVehicleId: id }),
  selectParking: (id: string) => set({ selectedParkingId: id }),
  clearSelection: () => set({ selectedVehicleId: null, selectedParkingId: null }),
}));
