// import { useRef, useEffect } from 'react';
import * as d3 from "d3";

import ChartContainer from "../chartComponents/chartContainer";
import Card from "@/UI/card/card";
import Curve from "../chartComponents/curve";
import Axis from "../chartComponents/axis";

export default function LineChartConv(props) {
  const margin = { top: 30, right: 70, bottom: 50, left: 70 };
  const width = 500;
  const height = 280;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // group data
  const data = props.data["error_it"].map((d, i) => ({
    it: i,
    error: d,
    time: props.data["time_it"][i],
  }));

  // scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.it)))
    .range([0, innerWidth]);

  const yScale_error = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.error))])
    .range([innerHeight, 0]);

  const yScale_time = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.time))])
    .range([innerHeight, 0]);

  return (
    <Card>
      <h2>Error Graph</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
        className="line-chart"
      >
        <Axis
          type="bottom"
          scale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"Iterations"}
        />
        <Axis
          type="left"
          scale={yScale_error}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label="Error [%]"
          stroke="red"
        />
        <g key={`line-error`}>
          <Curve
            data={data}
            xScale={xScale}
            yScale={yScale_error}
            xAccessor="it"
            yAccessor="error"
            stroke="red"
            strokeWidth={2}
          />
        </g>
        <Axis
          type="right"
          scale={yScale_time}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label="Time [s]"
          stroke="purple"
        />
        <g key={`line-time`}>
          <Curve
            data={data}
            xScale={xScale}
            yScale={yScale_time}
            xAccessor="it"
            yAccessor="time"
            stroke="purple"
            strokeWidth={2}
          />
        </g>
      </ChartContainer>
    </Card>
  );
}
