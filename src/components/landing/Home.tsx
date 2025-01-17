"use client"; // Mark this as a Client Component
import { useEffect, useState } from "react";
import MovieCard from "@/components/movieCard/MovieCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Search from "@/components/search/Search"; // Update the import path
import styles from "@/components/landing/page.module.css"; // Update the import path
import { Notification } from "@/components/movieDetails/Notifications"; // Update the import path
import Link from "next/link"; // Import Link for navigation

interface Movie {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
  imdbRating?: string;
}

export default function Home() {
  const [defaultMovies, setDefaultMovies] = useState<Movie[]>([]); // Movies for the home page
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Movies from search
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // Separate loading state for search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null); // Add error state
  const [page, setPage] = useState(1); // Pagination state
  const [hasMore, setHasMore] = useState(true); // Track if more movies are available
  const [totalResults, setTotalResults] = useState(0); // Total results from the API
  const [showNotification, setShowNotification] = useState(false);

  // Fetch default movies for the home page
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const response = await fetch(
          `https://www.omdbapi.com/?s=action&page=${page}&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.Search) {
          if (page === 1) {
            setDefaultMovies(data.Search); // Set initial movies
            setTotalResults(Number(data.totalResults)); // Set total results
          } else {
            setDefaultMovies((prevMovies) => [...prevMovies, ...data.Search]); // Append new movies
          }
          setHasMore(defaultMovies.length < Number(data.totalResults)); // Check if more movies are available
        }
      } catch (error) {
        console.error("Error fetching default movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, [page]); // Fetch movies when the page changes

  // Handle search query changes
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]); // Clear search results if query is empty
      setSearchError(null); // Clear error if query is empty
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null); // Clear previous error
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]); // Clear search results if no movies found
        setSearchError(data.Error || "No movies found."); // Set error message from the endpoint
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchError("An error occurred while fetching results."); // Set generic error message
    } finally {
      setSearchLoading(false);
    }
  };

  const toggleFavorite = (imdbID: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(imdbID)) {
        // If the movie is already in favorites, remove it
        return prevFavorites.filter((id) => id !== imdbID);
      } else {
        // If the movie is not in favorites, add it
        return [...prevFavorites, imdbID];
      }
    });

    // Show notification only when adding to favorites
    if (!favorites.includes(imdbID)) {
      setShowNotification(true);
    }
  };

  const loadMoreMovies = () => {
    if (defaultMovies.length < totalResults) {
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
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

      {/* Search Input */}
      <Search
        onSearch={handleSearch}
        movies={searchResults}
        loading={searchLoading}
        error={searchError} // Pass error to Search component
      />

      {/* Loading State */}
      {loading && page === 1 ? (
        <>
          <LoadingSpinner />
          <div className={styles.movieList}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        </>
      ) : (
        /* Movie List */
        <div className={styles.movieList}>
          {defaultMovies.length > 0 ? (
            defaultMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(movie.imdbID)} // Pass a function that returns the current state
              />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}

      {/* Load More Button */}
      {defaultMovies.length > 0 && defaultMovies.length < totalResults && (
        <button onClick={loadMoreMovies} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
}
