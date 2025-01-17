"use client"; // Add this directive at the top

import { useFavoritesStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import styles from "@/styles/favourite.module.css";

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();
  const [isClient, setIsClient] = useState(false);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.pageTitle}>Favourite Movies</h1>
      {favorites.length > 0 ? (
        <>
          <button
            onClick={clearFavorites}
            className={styles.clearAllButton}
            aria-label="Clear all favorites"
          >
            Clear All Favorites
          </button>
          <ul className={styles.favoritesList}>
            {favorites.map((movie) => (
              <li key={movie.imdbID} className={styles.favoriteItem}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className={styles.moviePoster}
                />
                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                <button
                  onClick={() => removeFavorite(movie.imdbID)}
                  className={styles.removeButton}
                  aria-label={`Remove ${movie.Title} from favorites`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.noFavoritesMessage}>
          No favourite movies added yet.
        </p>
      )}
    </div>
  );
}
