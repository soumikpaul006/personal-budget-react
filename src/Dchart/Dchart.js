import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function Dchart() {
  const [budgetDataFromAPI, setBudgetDataFromAPI] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:4000/budget')
      .then((response) => {
        setBudgetDataFromAPI(response.data.myBudget);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  useEffect(() => {
    // Create and render the pie chart using D3.js
    if (budgetDataFromAPI.length > 0) {
      renderPieChart(budgetDataFromAPI);
    }
  }, [budgetDataFromAPI]);

  const renderPieChart = (data) => {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const colors = d3.scaleOrdinal().range(d3.schemeCategory10);

    const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.budget);
    const data_ready = pie(data);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    svg.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => colors(i));

    svg.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d) => d.data.title)
      .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Visualization using D3.js</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Dchart;
