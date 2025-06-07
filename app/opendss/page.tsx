"use client";

import { Suspense } from "react";
import ShowOpenDSS from "./showOpenDSS";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const OpenDSSPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <ShowOpenDSS />
      </QueryClientProvider>
    </Suspense>
  );
};

export default OpenDSSPage;
