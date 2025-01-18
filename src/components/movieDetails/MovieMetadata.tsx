import styles from "./movie.details.page.module.css";
import { Movie } from "@/types/movie";

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieMetadata({ movie }: MovieDetailsProps) {
  return (
    <div className={styles.metadata}>
      <p>
        <strong>Released:</strong> {movie.Released}
      </p>
      <p>
        <strong>Runtime:</strong> {movie.Runtime}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Writers:</strong> {movie.Writer}
      </p>
      <p>
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Box Office:</strong> {movie.BoxOffice}
      </p>
      <p>
        <strong>Awards:</strong> {movie.Awards}
      </p>
    </div>
  );
}
