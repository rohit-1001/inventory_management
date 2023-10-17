import React from 'react';
import { Pie } from 'react-chartjs-2';

const StockPieChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>PRODUCTS</h2>
      <div style={{ width: '400px', height: '300px' }}>
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Products in stock"
              }
            },
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio constraint
          }}
        />
      </div>
    </div>
  );
};

export default StockPieChart;
