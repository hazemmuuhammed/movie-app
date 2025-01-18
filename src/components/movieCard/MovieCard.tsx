"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/components/movieCard/MovieCard.module.css";
import { useFavoritesStore } from "../../store/useStore";
// import LoadingSpinner from "@/components/common/LoadingSpinner";

interface MovieCardProps {
  movie: {
    Title: string;
    Poster: string;
    imdbID: string;
  };
  onToggleFavorite?: (imdbID: string) => void;
  isFavorite?: boolean;
  showRemoveButton?: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleCardClick = () => {
    // setIsLoading(true); // Set loading to true when navigating
    router.push(`/movie-details/${movie.imdbID}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);

    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }

    setTimeout(() => setIsBouncing(false), 500);
  };

  /* Show spinner when loading */

  return (
    <div
      className={styles.card}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles.posterContainer}>
        <Image
          src={
            movie.Poster === "N/A" ? "/movies/placeholder.jpg" : movie.Poster
          }
          alt={movie.Title}
          priority
          width={200}
          height={300}
          className={styles.poster}
        />
        <button
          type="button"
          className={`${styles.heartIcon} ${
            isFavorite(movie.imdbID) ? styles.favorite : ""
          } ${isBouncing ? styles.bounce : ""}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite(movie.imdbID) ? "❤️" : "🤍"}
        </button>
      </div>
      <h3 className={styles.title}>{movie.Title}</h3>
    </div>
  );
}
