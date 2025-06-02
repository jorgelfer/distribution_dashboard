import Charts from "@/components/charts/charts";
import { fetchOpenDSSData } from "./https";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ShowOpenDSS({ networkModel, inFile1 }) {
  const qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  const { data } = useSuspenseQuery({
    queryKey: ["qstsData", networkModel, inFile1],
    queryFn: () => fetchOpenDSSData(qstsURL),
    staleTime: 1000 * 60 * 5, // 5 minutes
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
}
