import { useContext, useEffect, useState } from "react";
import Charts from "@/components/charts/charts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CaseContext } from "@/store/case-data-context";
import { fetchOpenDSSData, fetchFBSData } from "../../data/https";

const ShowPowerFlow: React.FC = () => {
  // get context
  const caseCtx = useContext(CaseContext);
  const networkModel = caseCtx.case.networkModel;
  const inFile1 = caseCtx.case.inFile1;
  const kVA_base = caseCtx.config.kVA_base;
  const flat_start = caseCtx.config.flat_start;

  // get OpenDSS using tanstack query cache
  const qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  const { data: opendssData } = useSuspenseQuery({
    queryKey: ["opendss", networkModel, inFile1],
    queryFn: () => fetchOpenDSSData(qstsURL),
    staleTime: Infinity, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  console.log("OpenDSS data:", opendssData);

  // energy scheduling call
  opendssData["kVA_base"] =
    typeof kVA_base !== "number" ? parseFloat(kVA_base) : kVA_base;
  opendssData["flat_start"] = flat_start;
  opendssData["formulation"] = "fbs";

  // get scheduling data
  let { data } = useSuspenseQuery({
    queryKey: [
      "power_flow",
      opendssData,
      networkModel,
      inFile1,
      kVA_base,
      flat_start,
    ],
    queryFn: () => fetchFBSData(opendssData),
    staleTime: Infinity, // 5 minutes
  });

  let content;
  if (data) {
    content = (
      <Charts
        data={data}
        nodeSize={networkModel.includes("8500Node") ? 3 : 5}
        vm_base={networkModel.includes("8500Node") ? 0.05 : 0.05}
      />
    );
  }

  // update config button
  useEffect(() => {
    caseCtx.changeEnabled(true);
  }, []);

  return content;
};

export default ShowPowerFlow;
