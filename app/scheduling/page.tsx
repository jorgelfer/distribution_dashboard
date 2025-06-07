"use client";

import { Suspense } from "react";
import ShowScheduling from "./showScheduling";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const SchedulingPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <ShowScheduling />
      </QueryClientProvider>
    </Suspense>
  );
};

export default SchedulingPage;
