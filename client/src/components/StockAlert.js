import { useState, React } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import StockPieChart from './StockPieChart';
import EnhancedTable from './Tablemaking';
const StockAlert = () => {
  const sampleData = [
    {
      orderId: '1',
      date: '2023-09-25',
      quantity: 10,
      alertAmount: 100,
      status: 'Pending',
    },
    {
      orderId: '2',
      date: '2023-09-24',
      quantity: 15,
      alertAmount: 150,
      status: 'Shipped',
    },
    {
      orderId: '3',
      date: '2023-09-23',
      quantity: 8,
      alertAmount: 80,
      status: 'Delivered',
    },
    {
      orderId: '4',
      date: '2023-09-22',
      quantity: 20,
      alertAmount: 200,
      status: 'Pending',
    },
    {
      orderId: '5',
      date: '2023-09-21',
      quantity: 12,
      alertAmount: 120,
      status: 'Shipped',
    },
  ];
  
  const initialChartData = {
    labels: sampleData.map(item => `Product${item.orderId}`),
    datasets: [
      {
        data: sampleData.map(item => item.quantity),
        backgroundColor: ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue'],
      },
    ],
  };
  
  
  const [chartData, setChartData] = useState(initialChartData);
  
  
  return (
    <div className="flex" style={{ display: 'flex', flexDirection: 'row', margin: "0rem 6rem" }}>
      <div className='flex-item'>
        <StockPieChart chartData={chartData} />
      </div>
      <div className='flex-item' >
      <EnhancedTable data={sampleData}/>
      </div>
    </div>

  )
}

export default StockAlert
