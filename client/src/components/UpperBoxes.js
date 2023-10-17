import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import image1 from '../assets/image_2.png'
import axios from 'axios'

const UpperBoxes = () => {
    const [data, setData] = useState({
        profit:0,
        sales:0,
        tsales:0
    })
    let profit=0, sales=0, tsales=0
    const getData = async () => {
        try {
            const c = await axios.post("/getupfields");
            profit=c.data.profit
            sales=c.data.sales
            tsales=c.data.tsales
            setData({profit, sales, tsales})
        } catch (error) {
          alert("Some error occurred");
        }
      };
    
      useEffect(() => {
        getData();
      }, []);
    return (
        <div className="container">
            <div className="row justify-content-center"> {/* Added justify-content-center class */}
                <div className="col-md-4">
                    <Box sx={{ border: '1px solid black', padding: '10px' }}>
                        <div>
                            <div>
                            Total Sales
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <img src={image1} alt="Image" className="img-fluid" />
                                </div>
                                <div className="ml-2">
                                    {data.tsales}
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="col-md-4">
                    <Box sx={{ border: '1px solid black', padding: '10px' }}>
                        <div>
                            <div>
                            Profit
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <img src={image1} alt="Image" className="img-fluid" />
                                </div>
                                <div className="ml-2">
                                    {data.profit}
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="col-md-4">
                    <Box sx={{ border: '1px solid black', padding: '10px' }}>
                        <div>
                            <div>
                                Sales
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <img src={image1} alt="Image" className="img-fluid" />
                                </div>
                                <div className="ml-2">
                                    {data.sales}
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default UpperBoxes;
