"use client"; // Mark this as a Client Component

import { useState } from "react";
import Link from "next/link";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFavoritesStore } from "@/store/useStore";
import { Notification } from "@/components/movieDetails/Notifications";
import MoviePoster from "@/components/movieDetails/MoviePoster";
import MovieMetadata from "@/components/movieDetails/MovieMetadata";
import MovieRatings from "@/components/movieDetails/MovieRatings";
import MoviePlot from "@/components/movieDetails/MoviePlot";
import styles from "@/components/movieDetails/movie.details.page.module.css";
import React from "react";
import { Movie } from "@/types/movie";
interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const [isBouncing, setIsBouncing] = useState(false); // State for bouncy animation
  const [showNotification, setShowNotification] = useState(false);

  // Zustand store for favorites
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

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
  React.useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Hide notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

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
          <MovieRatings ratings={movie?.Ratings} />
          <MovieMetadata movie={movie} />
          <MoviePlot plot={movie.Plot} />
        </div>
      </div>
    </div>
  );
}
