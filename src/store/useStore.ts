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
  isFavorite: (imdbID: string) => boolean;
}

// Helper function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
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
  isFavorite: (imdbID) =>
    get().favorites.some((movie) => movie.imdbID === imdbID),
}));
