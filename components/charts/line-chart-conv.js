// import { useRef, useEffect } from 'react';
import * as d3 from "d3";

import ChartContainer from "../chartComponents/chartContainer";
import Card from "@/UI/card/card";
import Curve from "../chartComponents/curve";
import Axis from "../chartComponents/axis";
import { useEffect, useRef } from "react";

export default function LineChartConv(props) {
  const margin = { top: 30, right: 30, bottom: 50, left: 70 };
  const width = 400;
  const height = 245;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // group data
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

  const yScale_error = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.error)))
    .range([innerHeight, 0]);

  const yScale_time = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.time)))
    .range([innerHeight, 0]);

  const errorRef = useRef();
  useEffect(() => {
    const errorContainer = d3.select(errorRef.current);
    // define the 1st line
    var valueline = d3
      .line()
      .x(function (d) {
        return xScale(d.it);
      })
      .y(function (d) {
        return yScale_error(d.error);
      });

    // define the 2nd line
    var valueline2 = d3
      .line()
      .x(function (d) {
        return xScale(d.it);
      })
      .y(function (d) {
        return yScale_time(d.time);
      });

    // Add the valueline path.
    errorContainer
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the valueline2 path.
    errorContainer
      .append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

    // Add the X Axis
    errorContainer
      .append("g")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(d3.axisBottom(xScale));

    // Add the Y0 Axis
    errorContainer
      .append("g")
      .attr("class", "axisSteelBlue")
      .call(d3.axisLeft(yScale_error));

    // Add the Y1 Axis
    errorContainer
      .append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + innerWidth + ", 0 )")
      .call(d3.axisRight(yScale_time));
  }, [data, xScale, yScale_error, yScale_time]);

  return (
    <Card>
      <h2>Error Graph</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
        className="line-chart"
      >
        <g ref={errorRef} />
      </ChartContainer>
    </Card>
  );
}
