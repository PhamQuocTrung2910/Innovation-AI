import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as d3 from 'd3';
import cleanedData from './cleaned_real_estate_data.csv';

function About() {
  // Define unique content for each card with corresponding icons
  const cardContent = [
    {
      title: 'Dataset Explanation',
      text: `The dataset for this project focuses on key elements that shape the residential property market in Bengaluru, including housing location, property size, bedroom count, and bathroom count. Compiled from credible sources, it allows our model to examine intricate relationships within the data, producing accurate predictions for property prices specifically suited to Bengaluru's unique market conditions.`,
      icon: <SchoolIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Selection',
      text: `To address the complexities of Bengaluru’s housing market, our model selection process includes Linear Regression, Lasso Regression, and Decision Trees. Each was selected for its capability in managing nonlinear interactions: Linear and Lasso Regression excel at adapting to market fluctuations, while Decision Trees provide a nuanced understanding of key feature relationships. This combination enables our model to generate precise and dependable predictions tailored to Bengaluru’s unique housing dynamics.`,
      icon: <BarChartIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Explanation',
      text: `Our model utilizes sophisticated machine learning methods to predict housing prices by examining essential property factors that affect value. Each algorithm interprets interactions, like property characteristics and room layouts in relation to price to mirror actual market trends. Linear Regression, specifically, is adept at uncovering subtle data patterns, boosting the accuracy of predictions. This customized approach ensures reliable, meaningful forecasts that align with the distinct dynamics of Bengaluru’s housing market.`,
      icon: <InsightsIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
  ];

  // UseEffect hook to load the scatterplot and line chart once the component mounts
  useEffect(() => {
    d3.csv(cleanedData).then(data => {
      // Log the data to verify what we are getting
      console.log("Loaded Data:", data);

      // Parse data to convert necessary fields to numbers and filter out any invalid entries
      const filteredData = data.filter(d => {
        d.size = +d['total_sqft'];  // Corrected to match the column name 'total_sqft'
        d.price = +d['price']; // Corrected to match the column name 'price'
        return !isNaN(d.price) && !isNaN(d.size);
      });

      // Remove existing SVG (if any) to prevent multiple plots
      d3.select('#scatterplot svg').remove();
      d3.select('#linechart svg').remove();

      // Set dimensions and margins for the scatterplot
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create SVG container for scatterplot
      const svgScatter = d3.select('#scatterplot')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Set x and y scales with appropriate domains
      const x = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.size)])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.price)])
        .range([height, 0]);

      // Add axes to scatterplot
      svgScatter.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svgScatter.append('g')
        .call(d3.axisLeft(y));

      // Add scatterplot points with interactivity
      svgScatter.selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.size))
        .attr('cy', d => y(d.price))
        .attr('r', 5)
        .style('fill', 'steelblue')
        .on('mouseover', function (event, d) {
          d3.select(this).transition().duration(200).attr('r', 8).style('fill', 'orange');
          svgScatter.append('text')
            .attr('id', 'tooltip')
            .attr('x', x(d.size) + 10)
            .attr('y', y(d.price) - 10)
            .attr('fill', 'black')
            .text(`Size: ${d.size}, Price: ${d.price}`);
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('r', 5).style('fill', 'steelblue');
          d3.select('#tooltip').remove();
        });

      // Create SVG container for line chart
      const svgLine = d3.select('#linechart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Sort data by size to create a line
      const sortedData = filteredData.sort((a, b) => a.size - b.size);

      // Line generator function
      const line = d3.line()
        .x(d => x(d.size))
        .y(d => y(d.price));

      // Add line path to line chart
      svgLine.append('path')
        .datum(sortedData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add circles to the line chart to enable hover interactivity
      svgLine.selectAll('circle')
        .data(sortedData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.size))
        .attr('cy', d => y(d.price))
        .attr('r', 4)
        .style('fill', 'steelblue')
        .on('mouseover', function (event, d) {
          d3.select(this).transition().duration(200).attr('r', 8).style('fill', 'orange');
          svgLine.append('text')
            .attr('id', 'tooltip-line')
            .attr('x', x(d.size) + 10)
            .attr('y', y(d.price) - 10)
            .attr('fill', 'black')
            .text(`Size: ${d.size}, Price: ${d.price}`);
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('r', 4).style('fill', 'steelblue');
          d3.select('#tooltip-line').remove();
        });

      // Add axes to line chart
      svgLine.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svgLine.append('g')
        .call(d3.axisLeft(y));
    }).catch(error => {
      console.error("Error loading or processing data:", error);
    });
  }, []);

  return (
    <Box sx={{ padding: '40px 30px', backgroundColor: 'darkgrey' }}>
      {/* Title Section */}
      <Typography
        variant="h4"
        align="center"
        sx={{ 
          fontWeight: 'regular', 
          fontFamily: '"Roboto Condensed", sans-serif',
          fontSize: '3.5rem',
          marginTop: '30px', 
          marginBottom: '70px', 
          color: 'black', 
        }}
      >
        About the Model
      </Typography>

      {/* Cards Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '100px',
        }}
      >
        {cardContent.map((card, index) => (
          <React.Fragment key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: '10px',
                width: { xs: '100%', md: '25%' },
                height: { xs: 'auto', md: '500px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f3f5',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              {card.icon}
              <Typography variant="h5" sx={{ 
                fontWeight: 'regular', 
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: '2rem',
                marginBottom: '-10px', 
                color: 'black' 
                }}>
                {card.title}
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ 
                padding: '40px',
                color: 'black',
                textAlign: 'justify', 
                fontWeight: 525 
                }}>
                {card.text}
              </Typography>
            </Paper>

            {/* Arrows between cards */}
            {index < cardContent.length - 1 && (
              <ArrowForwardIcon sx={{ 
                fontSize: 50,
                color: '#000000',
              }} />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Scatterplot Section */}
      <Box id="scatterplot" sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ 
            fontWeight: 'regular', 
            fontFamily: '"Roboto Condensed", sans-serif',
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: 'black',
          }}
        >
          Scatterplot: Relationship Between Property Size and Price
        </Typography>
      </Box>

      {/* Line Chart Section */}
      <Box id="linechart" sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ 
            fontWeight: 'regular', 
            fontFamily: '"Roboto Condensed", sans-serif',
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: 'black',
          }}
        >
          Line Chart: Relationship Between Property Size and Price
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
