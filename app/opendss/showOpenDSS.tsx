import { useContext } from "react";
import Charts from "@/components/charts/charts";
import { fetchOpenDSSData } from "../../data/https";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CaseContext } from "@/store/case-data-context";

const ShowOpenDSS: React.FC = () => {
  // get context
  const caseCtx = useContext(CaseContext);
  const networkModel = caseCtx.case.networkModel;
  const inFile1 = caseCtx.case.inFile1;

  // OpenDSS data
  const qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  const { data } = useSuspenseQuery({
    queryKey: ["opendss", networkModel, inFile1],
    queryFn: () => fetchOpenDSSData(qstsURL),
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

export default ShowOpenDSS;
