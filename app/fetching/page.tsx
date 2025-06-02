"use client";
import styles from "./page.module.css";

// import { useQuery } from "@tanstack/react-query";
// import { fetchOpenDSSData } from "./https";
// import ShowScheduling from "./ShowScheduling";

// import { useState } from "react";
// import Buttons from "../Interactions/Buttons";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import ShowOpenDSS from "@/data/showOpenDSS";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function FetchingPage() {
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

  //   console.log(networkModel, inFile1);

  //   let qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  //   let { data, isPending, isError, error } = useQuery({
  //     queryKey: ["qstsData", networkModel, inFile1],
  //     queryFn: () => fetchOpenDSSData(qstsURL),
  //     staleTime: 1000 * 60 * 5, // 5 minutes
  //   });

  //   let content;
  //   if (isPending) {
  //     content = <div className="loading">Loading...</div>;
  //   }

  //   if (isError) {
  //     content = (
  //       <Error
  //         title={`An error occurred during ${activeLayer} fetching!`}
  //         message={error.info?.message || "Failed to fetch the data"}
  //       />
  //     );
  //   }

  //   if (data) {
  //     content = (
  //       <Charts
  //         data={data}
  //         nodeSize={networkModel.includes("8500Node") ? 3 : 5}
  //         vm_base={networkModel.includes("8500Node") ? 0.05 : 0.05}
  //       />
  //     );
  //   }

  //   return (
  //     <>
  //       {activeLayer === "opendss_qsts" ? (
  //         content
  //       ) : (
  //         <ShowScheduling
  //           networkModel={networkModel}
  //           inFile1={inFile1}
  //           openDSSData={data}
  //           activeLayer={activeLayer}
  //         />
  //       )}
  //       <Buttons
  //         buttons={solve_layers}
  //         activeButton={activeLayer}
  //         onButtonSelection={layerSelectionHandler}
  //       />
  //     </>
  //   );
}
