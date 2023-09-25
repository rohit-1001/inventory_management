import React from 'react'
import UpperBoxes from '../components/UpperBoxes';
import StockAlert from '../components/StockAlert';
import Compchta from '../components/Compchta';
import BarChart from '../components/BarChart';
const CDashboard = () => {
  const chartData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Selling Price',
        data: [50, 60, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Manufacturing Price',
        data: [30, 40, 25],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  const name = "Prices";
  return (
    <div>
    <br></br>
      <UpperBoxes/>
      <BarChart data={chartData} name={name} />
      <StockAlert/>
      <Compchta/>
    </div> 
  )
}

export default CDashboard
