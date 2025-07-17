import { useContext, useEffect } from "react";
import Charts from "@/components/charts/charts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CaseContext } from "@/store/case-data-context";
import { fetchOpenDSSData, fetchSchedulingData } from "../../data/https";

const ShowScheduling: React.FC = () => {
  // get context
  const caseCtx = useContext(CaseContext);
  const networkModel = caseCtx.case.networkModel;
  const inFile1 = caseCtx.case.inFile1;
  const formulation = caseCtx.config.formulation;
  const kVA_base = caseCtx.config.kVA_base;

  // get OpenDSS using tanstack query cache
  const qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  const { data: opendssData } = useSuspenseQuery({
    queryKey: ["opendss", networkModel, inFile1],
    queryFn: () => fetchOpenDSSData(qstsURL),
    staleTime: Infinity, // 5 minutes
  });

  // energy scheduling call
  opendssData["kVA_base"] =
    typeof kVA_base !== "number" ? parseFloat(kVA_base) : kVA_base;
  opendssData["formulation"] = formulation;

  // get scheduling data
  let { data } = useSuspenseQuery({
    queryKey: [
      "scheduling",
      opendssData,
      networkModel,
      inFile1,
      formulation,
      kVA_base,
    ],
    queryFn: () => fetchSchedulingData(opendssData),
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

  // return content;
  return content;
};

export default ShowScheduling;
