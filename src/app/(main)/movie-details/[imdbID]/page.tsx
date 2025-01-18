import { Suspense } from "react";
import MovieDetails from "@/components/movieDetails/MovieDetails";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getMovieDetails } from "@/services/movieDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ imdbID: string }>;
}) {
  // Fetch movie details using the reusable function
  const { imdbID } = await params;

  const movie = await getMovieDetails(imdbID);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MovieDetails movie={movie} />
    </Suspense>
  );
}
