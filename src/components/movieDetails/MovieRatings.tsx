import styles from "@/components/movieDetails/movie.details.page.module.css";
import { Movie } from "@/types/movie";

export default function MovieRatings({
  ratings,
}: {
  ratings: Movie["Ratings"];
}) {
  return (
    <div className={styles.ratings}>
      {Array.isArray(ratings) ? (
        ratings.map((rating, index) => (
          <div key={index} className={styles.rating}>
            <span className={styles.ratingSource}>{rating.Source}: </span>
            <span className={styles.ratingValue}>{rating.Value}</span>
          </div>
        ))
      ) : (
        <div className={styles.rating}>
          <span className={styles.ratingSource}>N/A</span>
          <span className={styles.ratingValue}>N/A</span>
        </div>
      )}
    </div>
  );
}
