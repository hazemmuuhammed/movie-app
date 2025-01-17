import Link from "next/link";
import styles from "../../page.module.css";

export default function Favorites() {
  return (
    <div className={styles.container}>
      <h1>Favorites Page</h1>
      <p>This is the Favorites Page.</p>
      <nav>
        <ul>
          <li>
            <Link href="/">Go back to Home</Link>
          </li>
          <li>
            <Link href="/movie-details">Go to Movie Details</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
