import React from 'react'
import UpperBoxes from '../components/UpperBoxes';
import StockAlert from '../components/StockAlert';
import Compchta from '../components/Compchta';
import { useEffect } from 'react';
import BarChart from '../components/BarChart';
const CDashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Dashboard';
  }, [])
  const chartData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Selling Price',
        data: [50, 60, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // A shade of blue
        borderColor: 'rgba(54, 162, 235, 1)', // A shade of blue
        borderWidth: 1,
      },
      {
        label: 'Manufacturing Price',
        data: [30, 40, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Another shade of blue
        borderColor: 'rgba(75, 192, 192, 1)', // Another shade of blue
        borderWidth: 1,
      },
    ],
  };  
  const name = "Prices";
  const parentContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10rem",
  };

  const chartContainerStyle = {
    margin: "auto",
    padding: "40px  0",
  };
  return (
    <div>
      <br></br>
      <div style={parentContainerStyle}>
        <div>
          <UpperBoxes />
        </div>
        <div style={chartContainerStyle}>
          <BarChart data={chartData} name={name} />
        </div>
      </div>
      <StockAlert />
      <Compchta />
    </div>
  )
}

export default CDashboard
