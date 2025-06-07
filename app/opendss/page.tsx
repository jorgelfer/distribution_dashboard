"use client";

import { Suspense, useContext } from "react";
import ShowOpenDSS from "@/data/showOpenDSS";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CaseContext } from "@/store/case-data-context";

export default function OpenDSSPage() {
  const caseCtx = useContext(CaseContext);
  const networkModel = caseCtx.case.networkModel;
  const inFile1 = caseCtx.case.inFile1;

  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <ShowOpenDSS networkModel={networkModel} inFile1={inFile1} />
      </QueryClientProvider>
    </Suspense>
  );
}
