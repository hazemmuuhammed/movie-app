import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonPoster}></div>
      <div className={styles.skeletonTitle}></div>
    </div>
  );
}
