import { create } from 'zustand';
import type { User } from './auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

interface TicketStore {
  selectedTicketId: string | null;
  filter: 'assigned' | 'in-transit' | 'completed';
  setSelectedTicketId: (id: string | null) => void;
  setFilter: (filter: 'assigned' | 'in-transit' | 'completed') => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export const useTicketStore = create<TicketStore>((set) => ({
  selectedTicketId: null,
  filter: 'assigned',
  setSelectedTicketId: (id) => set({ selectedTicketId: id }),
  setFilter: (filter) => set({ filter }),
}));
