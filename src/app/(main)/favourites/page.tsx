"use client"; // Ensure this directive is at the top

import { useFavoritesStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import styles from "@/components/favorites/favourite.module.css";
import FavoritesList from "@/components/favorites/FavoritesList";
import ClearFavoritesButton from "@/components/favorites/ClearFavoriteButton";
import Link from "next/link";

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
      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/favourites" className={styles.navLink}>
          Favorites
        </Link>
      </nav>

      <h1 className={styles.pageTitle}>Favourite Movies</h1>
      {favorites.length > 0 ? (
        <>
          <ClearFavoritesButton clearFavorites={clearFavorites} />
          <FavoritesList
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        </>
      ) : (
        <p className={styles.noFavoritesMessage}>
          No favourite movies added yet.
        </p>
      )}
    </div>
  );
}
