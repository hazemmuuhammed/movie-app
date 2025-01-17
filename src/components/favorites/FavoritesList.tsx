import React from "react";
import MovieCard from "@/components/movieCard/MovieCard";
import styles from "@/components/favorites/favourite.module.css";

interface FavoritesListProps {
  favorites: {
    imdbID: string;
    Poster: string;
    Title: string;
  }[];
  removeFavorite: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  removeFavorite,
}) => (
  <div className={styles.favoritesList}>
    {favorites.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
        showRemoveButton={true}
        onToggleFavorite={() => removeFavorite(movie.imdbID)}
      />
    ))}
  </div>
);

export default FavoritesList;
