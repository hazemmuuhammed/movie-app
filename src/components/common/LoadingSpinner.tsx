import styles from "@/components/common/LoadingSpinner.module.css";
export default function LoadingSpinner() {
  return (
    <div className={`${styles.loading}`}>
      <div className={`${styles.spinner}`}></div>
    </div>
  );
}
