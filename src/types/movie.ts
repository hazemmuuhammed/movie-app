export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  Plot: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Runtime: string;
  Director: string;
  Writer: string;
  Actors: string;
  BoxOffice: string;
  Awards: string;
  imdbRating: string;
}

export interface MovieProps {
  movie: Movie;
}
