// lib/movie.ts
"use server";

import { customFetch } from "@/helpers/custom-fetch";

export const getDefaultMovies = async (page: number = 1) => {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?s=action&page=${page}&apikey=${apiKey}`;

  const response = await customFetch({
    url: url, // Pass the full URL directly
    cacheTag: `movies-page-${page}`,
  });

  console.log("OMDB API Key:", process.env.NEXT_PUBLIC_OMDB_API_KEY);
  return response;
};
