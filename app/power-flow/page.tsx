"use client";

import { Suspense } from "react";
import ShowPowerFlow from "./show-power-flow";

const SchedulingPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShowPowerFlow />
    </Suspense>
  );
};

export default SchedulingPage;
