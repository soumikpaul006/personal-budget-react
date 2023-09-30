import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

function Bchart() {
  // eslint-disable-next-line no-unused-vars
  const [budgetData, setBudgetData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:4000/budget')
      .then((response) => {
        const data = response.data.myBudget;
        setBudgetData(data);
        createPieChart(data);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const createPieChart = (data) => {


    if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the existing chart
      }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map((item) => item.title),
          datasets: [
            {
              data: data.map((item) => item.budget),
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#4caf50',
                '#9c27b0',
                '#795548',
                '#f44336',
                '#2196f3',
                '#ff5722',
                '#607d8b',
              ],
            },
          ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
          },
      });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Visualization with Chart.js</h1>
      <p>
         <canvas ref={chartRef}  width={500} height={500}></canvas>
      </p>
    </div>
  );
}
export default Bchart;
