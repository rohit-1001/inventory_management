import React from 'react'
import "./FooterStyle.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import footerimg from "../assets/footerdiv.png"
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <>  
            <div>
                <img src={footerimg} alt="" className='footerimg'/>
            </div>
            <div className="mainFooter">

                <div className="blocks">

                    <div className="block1">
                        <div className="tab1">
                            <div className="address">
                                {/* <p className="Addresshead"><b>OFFICE ADDRESS</b></p> */}
                                <p className="fullAddress">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, veritatis saepe. Pariatur accusamus aliquid nesciunt at, deserunt sed perferendis explicabo error veritatis? Expedita voluptas excepturi debitis facere vel! Voluptatibus, modi.</p>
                            </div>
                            <div className="implinks">
                                <p className="linkshead"><b>IMPORTANT LINKS</b></p>
                                <ul>
                                    <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink'>Home</p></NavLink></li>
                                    <li><NavLink to="/app/about" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink'>About Us</p></NavLink></li>
                                    <li><NavLink to="/app/features" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink'>Features</p></NavLink></li>
                                </ul>
                            </div>
                        {/* </div>
                        <div className="tab1"> */}
                            <div className="contactDetails">
                                <p className="contact1"><b>CONTACT US</b></p>
                                <div className="contactemail">
                                    <div>
                                        <MailOutlineIcon></MailOutlineIcon>
                                    </div>
                                    <div>
                                        <a href="mailto: contact@prathaminvestments.com" target="_blank" rel="noreferrer">contact@sangrah.com</a>
                                    </div>
                                </div>
                                <div className="contactemail">
                                    <div>
                                        <CallOutlinedIcon></CallOutlinedIcon>
                                    </div>
                                    <div>
                                        <a href="tel: +91-992-034-1878">1234567890</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div className="footerbelow">
                <div className="footerbelowinside">© EXAMIX - All Rights Reserved.</div>
            </div>

            {/* <Outlet/> */}
        </>
    )
}

export default Footer