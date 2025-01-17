import { useState } from "react";
import Image from "next/image";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: {
    Title: string;
    Poster: string;
    imdbID: string;
  };
  onToggleFavorite: (imdbID: string) => void;
  isFavorite: boolean;
}

export default function MovieCard({
  movie,
  onToggleFavorite,
  isFavorite,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.posterContainer}>
        <Image
          src={movie.Poster === "N/A" ? "/no-poster.jpg" : movie.Poster}
          alt={movie.Title}
          priority
          width={200}
          height={300}
          className={styles.poster}
        />
        <button
          className={`${styles.heartIcon} ${isFavorite ? styles.favorite : ""}`}
          onClick={() => onToggleFavorite(movie.imdbID)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <h3 className={styles.title}>{movie.Title}</h3>
    </div>
  );
}
