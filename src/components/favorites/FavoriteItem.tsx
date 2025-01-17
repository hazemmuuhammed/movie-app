import React from "react";
import styles from "@/components/favorites/favourite.module.css";
import Image from "next/image";
interface FavoriteItemProps {
  movie: {
    imdbID: string;
    Poster: string;
    Title: string;
  };
  removeFavorite: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  movie,
  removeFavorite,
}) => (
  <li className={styles.favoriteItem}>
    <Image
      width={200}
      height={300}
      src={movie.Poster === "N/A" ? "/movies/placeholder.jpg" : movie.Poster}
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
);

export default FavoriteItem;
