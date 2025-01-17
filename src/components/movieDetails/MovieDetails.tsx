"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFavoritesStore } from "@/store/useStore";
import { Notification } from "@/components/movieDetails/Notifications";
import MoviePoster from "@/components/movieDetails/MoviePoster";
import MovieMetadata from "@/components/movieDetails/MovieMetadata";
import MovieRatings from "@/components/movieDetails/MovieRatings";
import MoviePlot from "@/components/movieDetails/MoviePlot";
import styles from "@/components/movieDetails/movie.details.page.module.css";

export default function MovieDetails({
  params,
}: {
  params: Promise<{ imdbID: string }>;
}) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBouncing, setIsBouncing] = useState(false); // State for bouncy animation
  const [showNotification, setShowNotification] = useState(false);

  // Zustand store for favorites
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${(await params).imdbID}&apikey=a406e1c`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found");
        }
        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params]);

  // Toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true); // Trigger bouncy animation

    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
      setShowNotification(true); // Show notification when a movie is added to favorites
    }

    // Reset animation after 500ms
    setTimeout(() => setIsBouncing(false), 500);
  };

  // Hide notification after a few seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Hide notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!movie) {
    return <div className={styles.error}>No movie data found.</div>;
  }

  return (
    <div className={styles.container}>
      {/* Notification */}
      {showNotification && <Notification />}

      {/* Back Button */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.backButton}>
          &larr; Go back to Home
        </Link>
        <Link href="/favourites" className={styles.favoritesLink}>
          Go to Favorites
        </Link>
      </nav>

      {/* Movie Poster and Details */}
      <div className={styles.movieContainer}>
        <MoviePoster
          movie={movie}
          handleToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          isBouncing={isBouncing}
        />
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{movie.Title}</h1>
          <p className={styles.tagline}>{movie.Genre}</p>
          <MovieRatings ratings={movie.Ratings} />
          <MovieMetadata movie={movie} />
          <MoviePlot plot={movie.Plot} />
        </div>
      </div>
    </div>
  );
}
