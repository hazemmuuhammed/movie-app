// app/page.tsx
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Home from "@/components/landing/Home";
import { getDefaultMovies } from "@/services/movie";
import { Suspense } from "react";

export default async function Page() {
  const initialData = await getDefaultMovies(1);
  const initialMovies = initialData.Search || [];
  const initialTotalResults = Number(initialData.totalResults) || 0;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Home
        initialMovies={initialMovies}
        initialTotalResults={initialTotalResults}
      />
    </Suspense>
  );
}
