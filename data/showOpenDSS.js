import Charts from "@/components/charts/charts";
import { fetchOpenDSSData } from "./https";
import { useSuspenseQuery } from "@tanstack/react-query";
import Buttons from "@/interactions/buttons";
import { useState } from "react";

const solve_layers = [
  { id: "opendss_qsts", label: "OpenDSS QSTS" },
  { id: "fbs_qsts", label: "FBS QSTS" },
  { id: "energy_scheduling", label: "Energy Scheduling" },
];

export default function ShowOpenDSS({ networkModel, inFile1 }) {
  // active layer
  const [activeLayer, setActiveLayer] = useState("opendss_qsts");

  // handle layer selection
  function layerSelectionHandler(id) {
    if (activeLayer !== id) {
      setActiveLayer(id);
    }
  }

  // OpenDSS data
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

  return (
    <>
      {/* {activeLayer === "opendss_qsts" ? (
        content
      ) : (
        <ShowScheduling
          networkModel={networkModel}
          inFile1={inFile1}
          openDSSData={data}
          activeLayer={activeLayer}
        />
      )} */}
      {content}
      <Buttons
        buttons={solve_layers}
        activeButton={activeLayer}
        onButtonSelection={layerSelectionHandler}
      />
    </>
  );
}
