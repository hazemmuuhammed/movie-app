import MovieDetails from "@/components/movieDetails/MovieDetails";

export default function Page({
  params,
}: {
  params: Promise<{ imdbID: string }>;
}) {
  return <MovieDetails params={params} />;
}
