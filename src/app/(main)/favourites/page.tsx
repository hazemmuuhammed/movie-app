"use client"; // Ensure this directive is at the top

import { useFavoritesStore } from "@/store/useStore";
import { Suspense, useEffect, useState } from "react";
import FavoritesLayout from "@/components/favorites/FavoritesLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function FavoritesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FavoritesLayout />;
    </Suspense>
  );
}
