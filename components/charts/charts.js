import React from "react";
import { useState } from "react";
import * as d3 from "d3";
import Header from "@/UI/header/header";
import LineChartVM from "./line-chart-VM";
import LineChartPQS from "./line-chart-PQS";
import LineChartBSS from "./line-chart-BSS";
import NetworkGraph from "./network-graph";
import { updateData } from "@/data/update";

var colorScale = d3
  .scaleQuantile()
  .domain([0, 1, 2, 3, 4])
  .range(["red", "#f28e2c", "#59a14f", "#4e79a7", "red"]);

const dateParser = d3.timeParse("%Y-%m-%dT%H:%M");

export default function Charts(props) {
  const margin = { top: 30, right: 30, bottom: 50, left: 70 };

  // Header
  const [selectedValue, setSelectedValue] = useState("vsource");
  function handleClick(selectedButton) {
    setSelectedValue((prev) =>
      prev !== selectedButton ? selectedButton : prev
    );
  }

  // selected buses
  const [selectedBuses, setSelectedBuses] = useState({
    selectedBus: null,
    buses: [],
  });

  function handleSelectBus(buses) {
    setSelectedBuses((prevBuses) => ({
      ...prevBuses,
      buses: buses,
    }));
  }

  // selected line
  const [selectedLine, setSelectedLine] = useState([]);
  function handleSelectLine(line) {
    setSelectedLine(line);
  }

  const [vdata, vextent, data, y_extent] = updateData(
    props.data,
    selectedValue,
    selectedBuses,
    selectedLine,
    dateParser,
    props.vm_base
  );

  const showPQS = [
    "vsource",
    "load",
    "dr_load",
    "flex_gen",
    "flex_load",
    "mismatch",
  ].includes(selectedValue);
  return (
    <>
      <Header
        handleClick={handleClick}
        selectedValue={selectedValue}
        data={props.data}
      />
      <div className="row">
        <div className="col-9">
          <NetworkGraph
            margin={margin}
            data={props.data}
            colorScale={colorScale}
            selectedValue={selectedValue}
            onSelectBus={handleSelectBus}
            onSelectLine={handleSelectLine}
            nodeSize={props.nodeSize}
          />
          {(selectedBuses.buses.length > 0 || selectedLine.length > 0) && (
            <p className="actions">
              <button
                onClick={() => {
                  handleSelectBus([]);
                  handleSelectLine([]);
                }}
              >
                Release
              </button>
            </p>
          )}
        </div>
        <div className="col-3">
          {selectedValue === "flow" ? (
            <>
              <LineChartPQS
                margin={margin}
                data={data[0]}
                y_extent={y_extent[0]}
                colorScale={colorScale}
                time={props.data["time"]}
                dateParser={dateParser}
                selectedValue={selectedValue}
                direction="from -> to"
              />
              <LineChartPQS
                margin={margin}
                data={data[1]}
                y_extent={y_extent[1]}
                colorScale={colorScale}
                time={props.data["time"]}
                dateParser={dateParser}
                selectedValue={selectedValue}
                direction="to -> from"
              />
            </>
          ) : (
            <>
              <LineChartVM
                margin={margin}
                data={vdata}
                y_extent={vextent}
                colorScale={colorScale}
                time={props.data["time"]}
                dateParser={dateParser}
                selectedValue={selectedValue}
              />
              {["battery"].includes(selectedValue) && (
                <LineChartBSS
                  margin={margin}
                  data={data}
                  y_extent={y_extent}
                  colorScale={colorScale}
                  time={props.data["time"]}
                  dateParser={dateParser}
                  selectedValue={selectedValue}
                />
              )}
              {showPQS && (
                <LineChartPQS
                  margin={margin}
                  data={data}
                  y_extent={y_extent}
                  colorScale={colorScale}
                  time={props.data["time"]}
                  dateParser={dateParser}
                  selectedValue={selectedValue}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
