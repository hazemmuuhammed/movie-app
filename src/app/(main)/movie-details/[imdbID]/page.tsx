"use client"; // Required for using hooks like useState and useEffect

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/shared/movie.details.page.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MovieDetails({
  params,
}: {
  params: Promise<{ imdbID: string }>;
}) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div>
        {" "}
        <LoadingSpinner />;{" "}
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
        {/* Poster */}
        <div className={styles.posterContainer}>
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
            className={styles.poster}
            priority
          />
        </div>

        {/* Movie Details */}
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{movie.Title}</h1>
          <p className={styles.tagline}>{movie.Genre}</p>

          {/* Ratings */}
          <div className={styles.ratings}>
            {movie.Ratings.map((rating: any, index: number) => (
              <div key={index} className={styles.rating}>
                <span className={styles.ratingSource}>{rating.Source}</span>
                <span className={styles.ratingValue}>{rating.Value}</span>
              </div>
            ))}
          </div>

          {/* Metadata */}
          <div className={styles.metadata}>
            <p>
              <strong>Released:</strong> {movie.Released}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Writers:</strong> {movie.Writer}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </p>
            <p>
              <strong>Awards:</strong> {movie.Awards}
            </p>
          </div>

          {/* Plot */}
          <p className={styles.plot}>{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
