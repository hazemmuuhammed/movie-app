import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/components/search/Search.module.css";
import Image from "next/image";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    imdbRating?: string;
  }

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // Debounce the search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch(searchQuery); // Only call handleSearch if searchQuery is not empty
      } else {
        setSearchResults([]); // Clear results if searchQuery is empty
        setSearchError(null); // Clear error if searchQuery is empty
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]); // Only re-run when searchQuery changes

  const handleSearch = async (query: string) => {
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
        setTotalResults(data.totalResults);
        setHasMore(data.Search.length > 0);
      } else {
        setSearchResults([]);
        setSearchError(data.Error || "No results found");
      }
    } catch (error) {
      setSearchError("An error occurred while searching");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        className={styles.searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      {searchLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        searchQuery.trim() !== "" && ( // Only show results or error if searchQuery is not empty
          <div className={styles.movieList}>
            {searchError ? (
              <p>{searchError}</p> // Show error message from the endpoint
            ) : searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <Link
                  key={movie.imdbID}
                  href={`/movie-details/${movie.imdbID}`} // Navigate to movie details page
                  passHref
                >
                  <div className={styles.movieCard}>
                    <Image
                      width={200}
                      height={300}
                      src={
                        movie.Poster === "N/A"
                          ? "/movies/placeholder.jpg"
                          : movie.Poster
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
};

export default Search;
