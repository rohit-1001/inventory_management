import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ data,name }) {
    return (
        <>
        <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:"20px 0 0 0" }}>{name}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:"20px 0 0 0" }}>
            <div style={{ width: '400px', height: '300px' }}>
                <Bar
                    data={data}
                    options={{
                        scales: {
                            x: {
                                beginAtZero: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
        </>

    );
}

export default BarChart;
