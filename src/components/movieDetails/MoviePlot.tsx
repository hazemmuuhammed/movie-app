import styles from "./movie.details.page.module.css";
export default function MoviePlot({ plot }: { plot: string }) {
  return <p className={styles.plot}>{plot}</p>;
}
