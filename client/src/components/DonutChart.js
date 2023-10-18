import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const DonutChart = ({ data }) => {
  const companyVsVendorRef = useRef(null);
  const salesVsProductsRef = useRef(null);
  
  useEffect(() => {
    const companyVsVendorChartCanvas = companyVsVendorRef.current;
    const salesVsProductsChartCanvas = salesVsProductsRef.current;

    if (companyVsVendorChartCanvas && companyVsVendorChartCanvas.chart) {
      companyVsVendorChartCanvas.chart.destroy();
    }
    if (salesVsProductsChartCanvas && salesVsProductsChartCanvas.chart) {
      salesVsProductsChartCanvas.chart.destroy();
    }

    // Create the "Company vs Vendor" Donut Chart
    companyVsVendorChartCanvas.chart = new Chart(companyVsVendorChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Vendors', 'Companies'],
        datasets: [
          {
            data: [data.nvendors, data.ncompany],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Create the "Total Sales vs Total Products" Donut Chart
    salesVsProductsChartCanvas.chart = new Chart(salesVsProductsChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Total Sales', 'Total Products'],
        datasets: [
          {
            data: [data.tsales, data.tprods],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, [data]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '600px' }}>
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <h2>Company vs Vendor</h2>
        <canvas ref={companyVsVendorRef} />
      </div>
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <h2>Total Sales vs Total Products</h2>
        <canvas ref={salesVsProductsRef} />
      </div>
    </div>
  );
};

export default DonutChart;