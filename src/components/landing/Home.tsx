"use client";

import { useState } from "react";
import { getDefaultMovies } from "@/services/movie";
import MovieCard from "@/components/movieCard/MovieCard";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import SkeletonLoader from "@/components/common/SkeletonLoader";
import Search from "@/components/search/Search";
import styles from "@/components/landing/page.module.css";
import { Notification } from "@/components/movieDetails/Notifications";
import Link from "next/link";

import { Movie } from "@/types/movie";

export default function Home({
  initialMovies,
  initialTotalResults,
}: {
  initialMovies: Movie[];
  initialTotalResults: number;
}) {
  const [defaultMovies, setDefaultMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const loadMoreMovies = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const data = await getDefaultMovies(nextPage);
    setDefaultMovies((prevMovies) => [...prevMovies, ...data.Search]);
    setPage(nextPage);
    setLoading(false);
  };

  const updateSearchResults = (movies: Movie[]) => {
    setSearchResults(movies);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/favourites" className={styles.navLink}>
          Favorites
        </Link>
      </nav>

      <h1>Movie Library</h1>

      <Notification />

      <Search
        updateChangeResults={updateSearchResults}
        searchResults={searchResults}
      />
      {searchResults.length === 0 && (
        <div className={styles.movieList}>
          {defaultMovies.length > 0 ? (
            defaultMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}

      {searchResults.length === 0 &&
        defaultMovies.length > 0 &&
        defaultMovies.length < initialTotalResults && (
          <button
            onClick={loadMoreMovies}
            className={styles.loadMoreButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
    </div>
  );
}
