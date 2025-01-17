"use client"; // Add this directive at the top

import { useFavoritesStore } from "@/store/useStore";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  return (
    <div>
      <h1>Favourite Movies</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourite movies added yet.</p>
      )}
    </div>
  );
}
