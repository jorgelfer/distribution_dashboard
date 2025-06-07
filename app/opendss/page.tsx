"use client";

import { Suspense } from "react";
import ShowOpenDSS from "./showOpenDSS";

const OpenDSSPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShowOpenDSS />
    </Suspense>
  );
};

export default OpenDSSPage;
