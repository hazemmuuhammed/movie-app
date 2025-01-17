import { Suspense } from "react";
import Home from "@/components/landing/Home";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Import a fallback component

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Home />
    </Suspense>
  );
}
