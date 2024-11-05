import React, { useEffect } from 'react';
import * as d3 from 'd3';
import HousePriceVisualization from './components/HousePriceVisualization'; // Adjust the path if needed


const HousePriceVisualization = ({ data }) => {
    useEffect(() => {
        // Clear previous chart
        d3.select('#chart').selectAll('*').remove();

        if (data.length > 0) {
            const svg = d3.select('#chart')
                .append('svg')
                .attr('width', 800)
                .attr('height', 400);

            const x = d3.scaleBand()
                .domain(data.map(d => d.location))
                .range([0, 800])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.price)])
                .nice()
                .range([400, 0]);

            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,400)')
                .call(d3.axisBottom(x));

            svg.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y));

            svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.location))
                .attr('y', d => y(d.price))
                .attr('width', x.bandwidth())
                .attr('height', d => 400 - y(d.price))
                .attr('fill', 'steelblue');
        }
    }, [data]);

    return <div id="chart"></div>;
};

export default HousePriceVisualization;
