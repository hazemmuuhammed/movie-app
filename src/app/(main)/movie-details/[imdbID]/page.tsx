import React, { Suspense } from "react";
import MovieDetails from "@/components/movieDetails/MovieDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page({
  params,
}: {
  params: Promise<{ imdbID: string }>;
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MovieDetails params={params} />
    </Suspense>
  );
}
