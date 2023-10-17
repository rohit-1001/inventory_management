import React from 'react'
import "./HomeStyles.css"
import rightsecimg from "../assets/hometrial2.png"
import verficiation from "../assets/id-removebg-preview.png"
import results from "../assets/online-exam.svg"
import createexam from "../assets/hometrial4.avif"
import homeimg1 from "../assets/homeimg1.png"
import testi1 from "../assets/testi1.jpg"
import testi2 from "../assets/testi2.jpg"
import testi3 from "../assets/testi3.jpg"
import Footer from './Footer'
const Home = () => {
  return (
    <>
      <div className="sec1">
        <div className="leftsec">
          <h2>Efficient Inventory Management at Your Fingertips</h2>
          <div className="seewhy">Discover why businesses prefer Sangrah over other inventory management solutions.</div>
          <div className="seewhyinfo">"Sangrah is my go-to inventory management platform. It allows me to streamline and optimize my inventory processes with ease, free from any hiccups. Sangrah's user-friendly interface simplifies the inventory management process, making it the ultimate choice for my business. Our company relies on Sangrah for all our inventory needs due to its efficiency and round-the-clock support."</div>
        </div>
        <div className="rightsec">
          <img src={rightsecimg} alt="" id="firstimg" />
        </div>
      </div>

      <div>
        <img src={homeimg1} alt="" className='footerimg' />
      </div>
      <div className="outerhead">
        <div id='heading1'>Efficient Inventory Management</div>
      </div>
      <div className="sec2">
        <div className="sec2div1">
          <div className="left">
            <h3>Manage Inventory</h3>
            <div className="leftinfo">
              <ul>
                <li>Efficiently organize and track your inventory using our intuitive management tools.</li>
                <li>Add and categorize your products, set stock levels, and keep an eye on restocking needs.</li>
                <li>Generate reports to analyze inventory trends and make informed business decisions.</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <img src={createexam} alt="" id="secondimg" />
          </div>
        </div>


        <div className="sec2div1">
          <div className="right">
            <img src={verficiation} alt="" id="thirdimg" />
          </div>
          <div className="left">
            <h3>Verify Inventory and Begin Management</h3>
            <div className="leftinfo">
              <ul>
                <li>Efficiently verify your inventory within 60 seconds.</li>
                <li>Access 24/7/365 customer support for any assistance.</li>
                <li>Utilize advanced inventory management software.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sec2div1">
          <div className="left">
            <h3>Review  Updates</h3>
            <div className="leftinfo">
              <ul>
                <li>Login to access your inventory updates on our platform.</li>
                <li>Check stock levels and receive feedback or notifications.</li>
                <li>Use these updates to guide your future inventory management and achieve your business goals.</li></ul>
            </div>
          </div>
          <div className="right">
            <img src={results} alt="" id="forthimg" />
          </div>
        </div>

      </div >
      <div id='heading2'>Testimonials</div>
      <div className="outertestimonials">
        <div class="container">
          <div class="testimonial-box">
            <div class="testimonial">
              <i class="fas fa-quote-right"></i>
              <span class="testimonial-text">"Efficient inventory management has been a game-changer for our business. A partnership with Sangrah has been one of our best decisions."</span>
              <div class="testimonial-user">
                <img src={testi1} alt="user-img" class="user-img" />
                <div class="user-info">
                  <span class="user-name">Brian Marchman</span>
                  <div class="user-job-details">
                    <span class="user-job">Business Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="testimonial-box">
            <div class="testimonial">
              <i class="fas fa-quote-right"></i>
              <span class="testimonial-text">"Efficient inventory management has been a game-changer for our business. A partnership with Sangrah has been one of our best decisions."</span>
              <div class="testimonial-user">
                <img src={testi2} alt="user-img" class="user-img" />
                <div class="user-info">
                  <span class="user-name">Brian Marchman</span>
                  <div class="user-job-details">
                    <span class="user-job">Business Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="testimonial-box">
            <div class="testimonial">
              <i class="fas fa-quote-right"></i>
              <span class="testimonial-text">"Efficient inventory management has been a game-changer for our business. A partnership with Sangrah has been one of our best decisions."</span>
              <div class="testimonial-user">
                <img src={testi3} alt="user-img" class="user-img" />
                <div class="user-info">
                  <span class="user-name">Brian Marchman</span>
                  <div class="user-job-details">
                    <span class="user-job">Business Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
