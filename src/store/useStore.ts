import { create } from "zustand";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

interface FavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  clearFavorites: () => void; // New function to clear all favorites
  isFavorite: (imdbID: string) => boolean;
  notification: string | null;
  setNotification: (message: string | null) => void;
}

// Helper function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Load favorites from localStorage (only on the client side)
const loadFavorites = (): Movie[] => {
  if (isLocalStorageAvailable()) {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  return [];
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: loadFavorites(),
  addFavorite: (movie) => {
    set((state) => {
      const newFavorites = [...state.favorites, movie];
      if (isLocalStorageAvailable()) {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return { favorites: newFavorites };
    });
  },
  removeFavorite: (imdbID) => {
    set((state) => {
      const newFavorites = state.favorites.filter(
        (movie) => movie.imdbID !== imdbID
      );
      if (isLocalStorageAvailable()) {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return { favorites: newFavorites };
    });
  },
  clearFavorites: () => {
    set(() => {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("favorites"); // Clear favorites from localStorage
      }
      return { favorites: [] }; // Reset favorites to an empty array
    });
  },
  isFavorite: (imdbID) =>
    get().favorites.some((movie) => movie.imdbID === imdbID),
  notification: null,
  setNotification: (message) => set({ notification: message }),
}));
