import { useContext, useState } from "react";
import Charts from "@/components/charts/charts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CaseContext } from "@/store/case-data-context";
import { fetchOpenDSSData, fetchSchedulingData } from "../../data/https";

const ShowScheduling: React.FC = () => {
  // get context
  const caseCtx = useContext(CaseContext);
  const networkModel = caseCtx.case.networkModel;
  const inFile1 = caseCtx.case.inFile1;

  // get OpenDSS using tanstack query cache
  const qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  const { data: opendssData } = useSuspenseQuery({
    queryKey: ["opendss", networkModel, inFile1],
    queryFn: () => fetchOpenDSSData(qstsURL),
    staleTime: Infinity, // 5 minutes
  });

  // handle change in configuration
  const [enteredConf, setEnteredConf] = useState({
    formulation: "fbs",
    kVA_base: 100.0,
  });

  // energy scheduling call
  opendssData["kVA_base"] =
    typeof enteredConf.kVA_base === "string"
      ? parseFloat(enteredConf.kVA_base)
      : enteredConf.kVA_base;
  opendssData["formulation"] = enteredConf.formulation;

  // get scheduling data
  let { data } = useSuspenseQuery({
    queryKey: ["scheduling", networkModel, inFile1],
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

  return content;
};

export default ShowScheduling;
