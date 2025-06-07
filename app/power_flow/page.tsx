"use client";

import { Suspense } from "react";
import ShowPowerFlow from "./showPowerFlow";

const SchedulingPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShowPowerFlow />
    </Suspense>
  );
};

export default SchedulingPage;
