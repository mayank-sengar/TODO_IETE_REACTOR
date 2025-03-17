import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          console.log('Toggling dark mode:', !state.isDarkMode); // Debugging
          return { isDarkMode: !state.isDarkMode };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);