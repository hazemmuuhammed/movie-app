import styles from "@/components/movieDetails/movie.details.page.module.css";
export default function MovieRatings({ ratings }: { ratings: any[] }) {
  return (
    <div className={styles.ratings}>
      {ratings.map((rating: any, index: number) => (
        <div key={index} className={styles.rating}>
          <span className={styles.ratingSource}>{rating.Source}</span>
          <span className={styles.ratingValue}>{rating.Value}</span>
        </div>
      ))}
    </div>
  );
}
