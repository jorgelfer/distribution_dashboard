"use client";

import { Suspense } from "react";
import ShowScheduling from "./showScheduling";

const SchedulingPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShowScheduling />
    </Suspense>
  );
};

export default SchedulingPage;
