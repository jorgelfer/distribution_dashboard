"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ShowOpenDSS from "@/data/showOpenDSS";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function OpenDSSPage() {
  const searchParams = useSearchParams();
  const networkModel = searchParams.get("network-model");
  const inFile1 = searchParams.get("infile1");

  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <ShowOpenDSS networkModel={networkModel} inFile1={inFile1} />
      </QueryClientProvider>
    </Suspense>
  );
}
