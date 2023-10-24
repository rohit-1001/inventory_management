import { React, useState } from 'react'
import StockPieChart from './StockPieChart';
import EnhancedTable from './complasttable';
const Compchta = () => {
    const sampleData = [
        {
            orderId: '1',
            name: 'Salt',
            quantity: 10,
            alertAmount: 100,
        },
        {
            orderId: '2',
            name: 'Sugar',
            quantity: 15,
            alertAmount: 150,
        },
        {
            orderId: '3',
            name: 'Wheat',
            quantity: 8,
            alertAmount: 80,
        },
        {
            orderId: '4',
            name: 'Humans',
            quantity: 20,
            alertAmount: 200,
        },
        {
            orderId: '5',
            name: "Rice",
            quantity: 12,
            alertAmount: 120,
        },
    ];

    const initialChartData = {
        labels: sampleData.map(item => item.name),
        datasets: [
            {
                data: sampleData.map(item => item.quantity),
                backgroundColor: ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue'],
            },
        ],
    };

    const [chartData, setChartData] = useState(initialChartData);
    return (
        <div>
            <div className="flex" style={{ display: 'flex', flexDirection: 'row', margin: "3rem auto", width: "75%", justifyContent: "space-between" }}>
                <div className='flex-item' style={{
                    // border: "2px solid black"
                }}>
                    <EnhancedTable data={sampleData} />
                </div>
                <div className='flex-item' style={{
                    display: "flex",
                    // border: "2px solid blue",
                    justifyContent: "top",
                    margin: "0 0 0 2em"
                }}>
                    <StockPieChart chartData={chartData} />

                </div>
            </div>
        </div>
    )
}

export default Compchta
