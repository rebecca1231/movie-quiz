import React, { useRef, useEffect, useContext } from "react";
import { select, arc, pie, scaleOrdinal, schemeBlues, interpolate } from "d3";
import useResizeObserver from "../util/quiz/useResizeObserver";
import {CountContext} from "../context/countContext";

const PieChart = () => {
    const {score, count} = useContext(CountContext)
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const data = [score, count - score];

  useEffect(() => {
 
    const colorScale = scaleOrdinal(schemeBlues[3]);
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = arc().innerRadius(75).outerRadius(150);
    const pieGenerator = pie().sort(null);
    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("stroke", "black")
      .attr("fill", (d, i) => colorScale(i))
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      .attr("d", (instruction) => arcGenerator(instruction))
      .on("mouseenter", (d, i) => {
        svg
          .selectAll(".tooltip")
          .data(instructions)
          .join((enter) => enter.append("text"))
          .attr("class", "tooltip")
          .text(i.index === 0 ? "Correct: " + i.value : "Incorrect: " + i.value)
          .attr("x", dimensions.width / 2)
          .attr("y", dimensions.height)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.selectAll(".tooltip").remove())
      .transition()
      .attrTween("d", function (nextInstruction, index) {
        // animation when changing data
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return function (t) {
          return arcGenerator(interpolator(t));
        };
      });
  }, [data, dimensions]);

  return (
    <div>
      <div
        ref={wrapperRef}
        style={{ marginTop: "3rem", marginBottom: "15rem" }}
      >
        <svg ref={svgRef} style={{ overflow: "visible" }}></svg>
      </div>
    </div>
  );
};
export default PieChart;
