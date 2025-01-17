import Link from "next/link";
import styles from "../../page.module.css";

export default function MovieDetails() {
  return (
    <div className={styles.container}>
      <h1>Movie Details Page</h1>
      <p>This is the Movie Details Page.</p>
      <nav>
        <ul>
          <li>
            <Link href="/">Go back to Home</Link>
          </li>
          <li>
            <Link href="/favourites">Go to Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
