"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/MovieCard.module.css";
import { useFavoritesStore } from "../store/useStore";

interface MovieCardProps {
  movie: {
    Title: string;
    Poster: string;
    imdbID: string;
  };
  onToggleFavorite: (imdbID: string) => void;
  isFavorite: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleCardClick = () => {
    router.push(`/movie-details/${movie.imdbID}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
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
          className={`${styles.heartIcon} ${
            isFavorite(movie.imdbID) ? styles.favorite : ""
          }`}
          onClick={handleToggleFavorite}
        >
          {isFavorite(movie.imdbID) ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 className={styles.title}>{movie.Title}</h3>
    </div>
  );
}
