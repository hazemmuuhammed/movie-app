import Link from "next/link";
import styles from "@/components/favorites/favourite.module.css";
import ClearFavoritesButton from "@/components/favorites/ClearFavoriteButton";
import FavoritesList from "@/components/favorites/FavoritesList";
import { useFavoritesStore } from "@/store/useStore";

const FavoritesLayout = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();

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
};

export default FavoritesLayout;
