import { useState } from "react";
import * as d3 from "d3";

import ChartContainer from "../chartComponents/chartContainer";
import Buttons from "@/interactions/buttons";
import Card from "@/UI/card/card";
import Curve from "../chartComponents/curve";
import Axis from "../chartComponents/axis";

const powers = [
  { id: "p", label: "Active" },
  { id: "q", label: "Reactive" },
  { id: "s", label: "Apparent" },
];

export default function LineChartPQS(props) {
  const [activePower, setActivePower] = useState("p");

  const width = 400;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  // group data
  const sumstat = d3.group(props.data.flat(), (d) => d.uid);

  // get array of uids
  var uids = Array.from(sumstat.keys()); // list of group names

  // scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(props.time, (d) => props.dateParser(d)))
    .range([0, innerWidth]);

  const formatTime = d3.timeFormat("%H");

  const yScale = d3
    .scaleLinear()
    .domain(props.y_extent)
    .range([innerHeight, 0]);

  function powerSelectionHandler(id) {
    if (activePower !== id) {
      setActivePower(id);
    }
  }

  function y_label(d) {
    switch (activePower) {
      case "p":
        return "Power [kW]";
      case "q":
        return "Power [kvar]";
      case "s":
        return "Power [kVA]";
      default:
        return "Power [kW]";
    }
  }

  let title;
  if (["flex_gen", "flex_load"].includes(props.selectedValue)) {
    title = `Operating envelopes: ${props.selectedValue}`;
  } else if (props.selectedValue === "flow") {
    title = `Power Flow: ${props.direction}`;
  } else {
    title = `Dispatched Power: ${props.selectedValue}`;
  }

  return (
    <Card>
      <h3>{title}</h3>
      <Buttons
        buttons={powers}
        activeButton={activePower}
        onButtonSelection={powerSelectionHandler}
      />
      <ChartContainer
        width={width}
        height={height}
        margin={props.margin}
        className="line-chart"
      >
        <Axis
          type="time"
          time={props.time}
          dateParser={props.dateParser}
          formatTime={formatTime}
          scale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"Time [h]"}
        />
        <Axis
          type="left"
          scale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={y_label()}
        />
        {uids.map((uid, i) => (
          <g key={`line-${uid}`}>
            <Curve
              data={sumstat.get(uid)}
              xScale={xScale}
              yScale={yScale}
              xAccessor="time"
              yAccessor={activePower}
              stroke={props.colorScale(sumstat.get(uid)[0].phase)}
              strokeWidth={2}
            />
          </g>
        ))}
      </ChartContainer>
    </Card>
  );
}
