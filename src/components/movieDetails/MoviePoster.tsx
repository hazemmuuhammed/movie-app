import Image from "next/image";
import styles from "@/components/movieDetails/movie.details.page.module.css";
import { Movie } from "@/types/movie";
export default function MoviePoster({
  movie,
  handleToggleFavorite,
  isFavorite,
  isBouncing,
}: {
  movie: Movie;
  handleToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: (imdbID: string) => boolean;
  isBouncing: boolean;
}) {
  return (
    <div className={styles.posterContainer}>
      <Image
        src={movie.Poster === "N/A" ? "/movies/placeholder.jpg" : movie.Poster}
        alt={movie.Title}
        width={300}
        height={450}
        className={styles.poster}
        priority
      />
      <button
        onClick={handleToggleFavorite}
        className={`${styles.heartButton} ${
          isFavorite(movie.imdbID) ? styles.favorite : ""
        } ${isBouncing ? styles.bounce : ""}`} // Add bounce class when isBouncing is true
        aria-label={
          isFavorite(movie.imdbID)
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {isFavorite(movie.imdbID) ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
