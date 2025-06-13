// import { useRef, useEffect } from 'react';
import * as d3 from "d3";

import ChartContainer from "../chartComponents/chartContainer";
import Card from "@/UI/card/card";
import Curve from "../chartComponents/curve";
import Axis from "../chartComponents/axis";

export default function LineChartConv(props) {
  const margin = { top: 30, right: 30, bottom: 50, left: 70 };
  const width = 400;
  const height = 245;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // group data
  const sumstat = props.data["error_it"];
  const indexArray = sumstat.map((_, index) => index);

  const data = props.data["error_it"].map((d, i) => ({
    it: i,
    error: d,
    time: props.data["error_it"],
  }));

  // scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.it)))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.error)))
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
          scale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label="Error [%]"
        />
        <g key={`line-error`}>
          <Curve
            data={data}
            xScale={xScale}
            yScale={yScale}
            xAccessor="it"
            yAccessor="error"
            stroke="red"
            strokeWidth={2}
          />
        </g>
      </ChartContainer>
    </Card>
  );
}
