import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { hexbin as d3Hexbin } from "d3-hexbin";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Feature, Geometry, GeoJsonProperties } from "geojson";

type TooltipState = { x: number; y: number; count: number };

const rawPoints = [
  { lon: 55.2708, lat: 25.2048 }, { lon: 55.3117, lat: 25.2854 },
  { lon: 55.2963, lat: 25.1972 }, { lon: 55.2500, lat: 25.2200 },
  { lon: 55.3300, lat: 25.2600 }, { lon: 55.2800, lat: 25.1800 },
  { lon: 54.3773, lat: 24.4539 }, { lon: 54.4200, lat: 24.4800 },
  { lon: 54.3500, lat: 24.4300 }, { lon: 54.4000, lat: 24.5000 },
  { lon: 54.3900, lat: 24.4100 }, { lon: 54.3600, lat: 24.5200 },
  { lon: 55.3047, lat: 25.3462 }, { lon: 55.3300, lat: 25.3700 },
  { lon: 55.2900, lat: 25.3600 }, { lon: 55.3500, lat: 25.3200 },
  { lon: 55.5136, lat: 25.4052 }, { lon: 55.5000, lat: 25.4300 },
  { lon: 55.5400, lat: 25.3900 },
  { lon: 55.9432, lat: 25.7953 }, { lon: 55.9600, lat: 25.8100 },
  { lon: 55.9200, lat: 25.7800 },
  { lon: 56.3341, lat: 25.1288 }, { lon: 56.3500, lat: 25.1500 },
  { lon: 55.7522, lat: 24.2075 }, { lon: 55.7700, lat: 24.2200 },
  { lon: 55.7400, lat: 24.1900 },
];

export default function UAEHexbinMap() {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    d3.json("/uae-topo.json").then((topo) => {
      const topology = topo as Topology<{ uae: GeometryCollection }>;
      const geojson = topojson.feature(topology, topology.objects.uae) as FeatureCollection;

      const projection = d3.geoMercator()
        .fitSize([width, height], geojson);

      const path = d3.geoPath().projection(projection);

      svg.append("g")
        .selectAll("path")
        .data(geojson.features)
        .join("path")
        .attr("d", (d: Feature<Geometry, GeoJsonProperties>) => path(d))
        .attr("fill", "#e8dfc8")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 0.8);

      const points = rawPoints
        .map(d => projection([d.lon, d.lat]))
        .filter((p): p is [number, number] => p !== null);

      const hexRadius = 20;

      const hexbin = d3Hexbin<[number, number]>()
        .x(d => d[0])
        .y(d => d[1])
        .radius(hexRadius)
        .extent([[0, 0], [width, height]]);

      const bins = hexbin(points);

      const maxCount = d3.max(bins, d => d.length) ?? 0;

      const colorScale = d3.scaleSequential()
        .domain([0, maxCount])
        .interpolator(d3.interpolateYlOrRd);

      const radiusScale = d3.scaleSqrt()
        .domain([0, maxCount])
        .range([0, hexRadius]);

      svg.append("g")
        .selectAll("path.hex")
        .data(bins)
        .join("path")
        .attr("class", "hex")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("d", d => hexbin.hexagon(radiusScale(d.length)))
        .attr("fill", d => colorScale(d.length))
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.85)
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget)
            .attr("stroke", "#333")
            .attr("stroke-width", 1.5);
          setTooltip({ x: event.offsetX, y: event.offsetY, count: d.length });
        })
        .on("mousemove", (event) => {
          setTooltip(prev => prev ? { ...prev, x: event.offsetX, y: event.offsetY } : prev);
        })
        .on("mouseout", (event) => {
          d3.select(event.currentTarget)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
          setTooltip(null);
        });

      const legendWidth = 150;
      const legendHeight = 10;
      const legendX = width - legendWidth - 20;
      const legendY = height - 40;

      const defs = svg.append("defs");
      const linearGradient = defs.append("linearGradient")
        .attr("id", "hex-legend-gradient");

      linearGradient.selectAll("stop")
        .data(d3.range(0, 1.01, 0.1))
        .join("stop")
        .attr("offset", d => `${d * 100}%`)
        .attr("stop-color", d => d3.interpolateYlOrRd(d));

      svg.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#hex-legend-gradient)");

      svg.append("text")
        .attr("x", legendX)
        .attr("y", legendY - 4)
        .attr("font-size", 10)
        .attr("fill", "#555")
        .text("Low");

      svg.append("text")
        .attr("x", legendX + legendWidth)
        .attr("y", legendY - 4)
        .attr("font-size", 10)
        .attr("fill", "#555")
        .attr("text-anchor", "end")
        .text("High");
    });
  }, []);

  return (
    <div style={{ position: "relative", borderRadius: 8 }}>
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
      {tooltip && (
        <div style={{
          position: "absolute",
          left: tooltip.x + 12,
          top: tooltip.y - 12,
          background: "white",
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: "6px 10px",
          pointerEvents: "none",
          fontSize: 13,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          📍 <strong>{tooltip.count}</strong> point{tooltip.count > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
