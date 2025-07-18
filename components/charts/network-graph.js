import { useState, useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";

import Card from "@/UI/card/card";
import ChartContainer from "../chartComponents/chartContainer";
import Buttons from "@/interactions/buttons";

import NodeBreaker from "./network/nodeBreaker";
import Net from "./network/net";
import ForceGraph from "./network/force-graph";

import GeojsonMap from "./mapping/GeojsonMap";
import bronx from "./mapping/bronx.json";

import Form from "@/UI/device/form";

// to download the graph as a PDF
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const layers = [
  { id: "react", label: "React.js" },
  { id: "coordinates", label: "D3.js" },
  // { id: "coordinates", label: "Coordinates" },
  { id: "force", label: "Force" },
  { id: "nodebreaker", label: "Node Breaker" },
  { id: "geojson", label: "Geojson" },
];

export default function NetworkGraph({ margin, data, ...props }) {
  const width = 1000;
  const height = 590;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear().range([0, innerWidth]);
  const yScale = d3.scaleLinear().range([innerHeight, 0]);

  // scales
  const linkScale = d3
    .scaleSqrt()
    .domain(d3.extent(data.branch, (d) => d.f_connections.length))
    .range([2, 6]);

  // The force simulation mutates links and nodes,
  // so, make a deep copy of the dataset
  var network = JSON.parse(JSON.stringify(data));

  const handleSubmitDevice = useCallback(
    (device, remove) => {
      // initialize device container
      data[`${props.selectedValue}`] = data[`${props.selectedValue}`] || [];
      // filter out the devices in case it is already in the network
      data[`${props.selectedValue}`] = data[`${props.selectedValue}`].filter(
        (f) => f.uid !== device.uid
      );
      // append the device to the network
      if (!remove) {
        data[`${props.selectedValue}`].push(device);
      }

      // disassociate the data to avoid mutations
      network = JSON.parse(JSON.stringify(data));
    },
    [data, props.selectedValue]
  );

  const [, setForceUpdate] = useState(0);
  const handleDeleteBuses = useCallback(
    (buses) => {
      const busSet = new Set(buses);

      // delete the buses from the data
      data["bus"] = data["bus"].filter((b) => !busSet.has(b.uid));
      // data['bus'] = data['bus'].filter(f => console.log(f.uid));

      // delete associated branches
      data["branch"] = data["branch"].filter(
        (br) => !busSet.has(br.source) && !busSet.has(br.target)
      );

      // delete isolated buses
      data["bus"] = data["bus"].filter((b) =>
        data["branch"].some((br) => br.source === b.uid || br.target === b.uid)
      );

      // Remove associated components
      const componentKeys = [
        "load",
        "capacitor",
        "battery",
        "dr_load",
        "flex_gen",
        "flex_load",
      ];

      for (const key of componentKeys) {
        if (Array.isArray(data[key])) {
          data[key] = data[key].filter((item) => !busSet.has(item.bus));
        }
      }

      // update network data
      network = JSON.parse(JSON.stringify(data));

      // Trigger re-render
      setForceUpdate((prev) => prev + 1);
    },
    [data]
  );

  // active layer
  const [activeLayer, setActiveLayer] = useState("react");
  // handle layer selection
  function layerSelectionHandler(id) {
    if (activeLayer !== id) {
      setActiveLayer(id);
    }
  }

  // selected device
  const [selectedDevice, setSelectedDevice] = useState(null);
  // handle device selection
  function handleSelectDevice(device) {
    setSelectedDevice(device);
  }

  // handle form change
  function handleChangeDevice(identifier, value) {
    setSelectedDevice((prevDevice) => ({
      ...prevDevice,
      [identifier]: value,
    }));
  }

  // handle network interactions
  const [selectedAction, setSelectedAction] = useState("cursor");
  function handleSelectedAction(selectedIcon) {
    if (selectedAction !== selectedIcon) {
      setSelectedAction(selectedIcon);
    }
    if (selectedIcon === "download") {
      handleDownloadPdf();
    }
  }

  // change action to default when a layer changes or
  // when a value is selected
  useEffect(() => {
    setSelectedAction("cursor");
  }, [activeLayer, props.selectedValue]);

  const printRef = useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };

  return (
    <Card ref={printRef}>
      <h2>Network</h2>
      <Buttons
        buttons={layers}
        activeButton={activeLayer}
        onButtonSelection={layerSelectionHandler}
      />
      {selectedDevice && (
        <div className="device-form">
          {Form(
            props.selectedValue,
            selectedDevice,
            handleSelectDevice,
            handleChangeDevice,
            handleSubmitDevice
          )}
        </div>
      )}
      {activeLayer === "react" && (
        <ChartContainer
          width={width}
          height={height}
          margin={margin}
          className="network-graph"
        >
          <ForceGraph
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            margin={margin}
            data={network}
            activeLayer={activeLayer}
            originalNodeSize={props.nodeSize}
            xScale={xScale}
            yScale={yScale}
            linkScale={linkScale}
            colorScale={props.colorScale}
            selectedValue={props.selectedValue}
            selectedAction={selectedAction}
            onSelectBus={props.onSelectBus}
            onSelectLine={props.onSelectLine}
            onSelectDevice={handleSelectDevice}
            onSubmitDevice={handleSubmitDevice}
            onDeleteBuses={handleDeleteBuses}
            onSelectedAction={handleSelectedAction}
          />
        </ChartContainer>
      )}
      {["coordinates", "force"].includes(activeLayer) && (
        <ChartContainer
          width={width}
          height={height}
          margin={margin}
          className="network-graph"
        >
          <Net
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            margin={margin}
            data={network}
            activeLayer={activeLayer}
            originalNodeSize={props.nodeSize}
            xScale={xScale}
            yScale={yScale}
            linkScale={linkScale}
            colorScale={props.colorScale}
            selectedValue={props.selectedValue}
            onSelectBus={props.onSelectBus}
            selectedAction={selectedAction}
            onSelectDevice={handleSelectDevice}
            onSubmitDevice={handleSubmitDevice}
            onSelectedAction={handleSelectedAction}
          />
        </ChartContainer>
      )}
      {activeLayer === "nodebreaker" && (
        <ChartContainer
          width={width}
          height={height}
          margin={margin}
          className="network-graph"
        >
          <NodeBreaker
            margin={margin}
            data={network}
            activeLayer={activeLayer}
            originalNodeSize={props.nodeSize}
            xScale={xScale}
            yScale={yScale}
            linkScale={linkScale}
            colorScale={props.colorScale}
            selectedValue={props.selectedValue}
          />
        </ChartContainer>
      )}
      {activeLayer === "geojson" && (
        <ChartContainer
          width={width}
          height={height}
          margin={margin}
          className="map-container"
        >
          <GeojsonMap
            width={innerWidth}
            height={innerHeight}
            geo_data={bronx}
            data={network}
            linkScale={linkScale}
            colorScale={props.colorScale}
            selectedValue={props.selectedValue}
          />
        </ChartContainer>
      )}
    </Card>
  );
}
