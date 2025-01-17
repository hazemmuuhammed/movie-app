import React from "react";
import styles from "@/components/favorites/favourite.module.css";

interface ClearFavoritesButtonProps {
  clearFavorites: () => void;
}

const ClearFavoritesButton: React.FC<ClearFavoritesButtonProps> = ({
  clearFavorites,
}) => {
  const handleClick = () => {
    const list = document.querySelector(`.${styles.favoritesList}`);
    if (list) {
      list.classList.add(styles.clearList);
      setTimeout(() => {
        clearFavorites();
        list.classList.remove(styles.clearList);
      }, 1000); // Duration of the clearList animation
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.clearAllButton}
      aria-label="Clear all favorites"
    >
      Clear All Favorites
    </button>
  );
};

export default ClearFavoritesButton;
