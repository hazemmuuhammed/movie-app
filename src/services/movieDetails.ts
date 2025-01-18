// lib/movie.ts
"use server";

import { customFetch } from "@/helpers/custom-fetch";

export const getMovieDetails = async (imdbID: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  const movie = await customFetch({
    url: url,
    cacheTag: `movie-${imdbID}`,
  });

  if (!movie || movie.Response === "False") {
    throw new Error("Movie not found");
  }

  return movie;
};
