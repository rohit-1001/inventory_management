import React from 'react';
import { Line } from 'react-chartjs-2';

const dummyData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Example Data',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(30, 144, 255, 0.4)', // A shade of blue
      borderColor: 'rgba(30, 144, 255, 1)', // A shade of blue
      pointBorderColor: 'rgba(30, 144, 255, 1)', // A shade of blue
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(30, 144, 255, 1)', // A shade of blue
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
};

function LineChart() {
  return (
    <div style={{ margin: 'auto', textAlign: 'center', width:"500px",margin:"1em", height:"300%" }}>
      <Line
        data={dummyData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
