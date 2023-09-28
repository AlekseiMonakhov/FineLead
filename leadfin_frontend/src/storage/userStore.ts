import { create } from 'zustand';

interface UserState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}


const storedUser = localStorage.getItem('user');

export const useUserStore = create<UserState>((set) => ({
  user: storedUser || null,
  login: (username) => {
    set({ user: username });
    localStorage.setItem('user', username);
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
}));