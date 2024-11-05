import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HousePriceBarChart = ({ data }) => {
    useEffect(() => {
        // Clear any previous charts
        d3.select('#bar-chart').selectAll('*').remove();

        if (data.length > 0) {
            // Set dimensions and margins for the SVG
            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Create SVG
            const svg = d3.select('#bar-chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Create scales
            const x = d3.scaleBand()
                .domain(data.map(d => d.location)) // Map locations to the x-axis
                .range([0, width])
                .padding(0.1); // Padding between bars

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.price)]) // Max price for y-axis
                .nice() // Nice round scale
                .range([height, 0]);

            // Add axes
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y));

            // Create bars
            svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.location))
                .attr('y', d => y(d.price))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.price))
                .attr('fill', 'steelblue');
        }
    }, [data]);

    return <div id="bar-chart"></div>;
};

export default HousePriceBarChart;
