"use client"; // Mark this as a Client Component
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import styles from "@/styles/Search.module.css";

interface Movie {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
  imdbRating?: string; // Rating may not always be available
}

interface SearchProps {
  onSearch: (query: string) => void;
  movies: Movie[];
  loading: boolean;
  error?: string | null; // Add error prop
}

export default function Search({
  onSearch,
  movies,
  loading,
  error,
}: SearchProps) {
  const [query, setQuery] = useState("");

  // Debounce the search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim() !== "") {
        onSearch(query); // Only call onSearch if query is not empty
      } else {
        onSearch(""); // Clear results if query is empty
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [query]); // Only re-run when query changes

  return (
    <div className={styles.searchContainer}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {/* Search Results */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        query.trim() !== "" && ( // Only show results or error if query is not empty
          <div className={styles.movieList}>
            {error ? (
              <p>{error}</p> // Show error message from the endpoint
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <Link
                  key={movie.imdbID}
                  href={`/movie-details/${movie.imdbID}`} // Navigate to movie details page
                  passHref
                >
                  <div className={styles.movieCard}>
                    <img
                      src={
                        movie.Poster === "N/A" ? "/no-poster.jpg" : movie.Poster
                      }
                      alt={movie.Title}
                      className={styles.poster}
                    />
                    <div className={styles.movieInfo}>
                      <h3>{movie.Title}</h3>
                      <p>Year: {movie.Year}</p>
                      <p>Rating: {movie.imdbRating || "N/A"}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No movies found.</p> // Show "No movies found" only if there are no results
            )}
          </div>
        )
      )}
    </div>
  );
}
