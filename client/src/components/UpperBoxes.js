import React from 'react';
import Box from '@mui/material/Box';
import image1 from '../assets/image_2.png';

const UpperBoxes = () => {
    return (
        <div className="container">
            <div className="row justify-content-center"> {/* Added justify-content-center class */}
                <div className="col-md-4">
                    <Box sx={{ border: '1px solid black', padding: '10px' }}>
                        <div>
                            <div>
                                Revenue
                            </div>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <img src={image1} alt="Image" className="img-fluid" />
                                </div>
                                <div className="ml-2">
                                    + 30000
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
                                    + 20000
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
                                    + 10000
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
