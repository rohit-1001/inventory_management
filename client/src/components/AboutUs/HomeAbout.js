// import React from 'react'
// import Navbar from './Navbar'
// import About from './About'
// import Testimonials from './Testimonials'
// import Demo from './Demo'
// import Picture from './Picture'

// function HomeAbout() {
//   return (
//     <div>
//     {/* <Picture/> */}
//       {/* <Navbar /> */}
//       <About />
//       {/* <Testimonials /> */}
//       <Demo />
//     </div>
//   );
// }

// export default HomeAbout;


// ======================================================================================

import React from 'react'
import leftimg from "./images/download.png"
import whatis from "./images/QualityArtboard16@2x-8-2x.png"
import "./AboutStyles.css"
import whatisupper from "./images/whatisdivimg.png"
import whatisdownimg from "./images/whatisdownimg.png"
import founders from "./images/founders.png"
import homeimg1 from "./images/homeimg1.png"
import Footer from "../../components/Footer"

export default function HomeAbout() {
  return (
    <>
    <div>
      <div className="sec1" id='aboutsec1'>
        <div className="rightsec">
          <img src={leftimg} alt="" id="firstimg" />
        </div>
        <div className="leftsec">
          <h2>Who is Examix?</h2>
          <div className="seewhy">We make online proctoring simple, easy, and human.</div>
          <div className="seewhyinfo">There’s a notion that online proctoring services are simply out to catch students who are cheating on tests. But our mission is much bigger than that. We know there’s a better way to protect academic integrity. Our approach to online proctoring is to do what’s good for the institution and good for the learner.
            <br />That’s why we’ve dedicated ourselves to taking the technical online proctoring experience and making it human. The result is a solution that brings integrity, humanity, confidence, and positive outcomes to the proctored testing experience.</div>
        </div>

      </div>
      <div>
                <img src={homeimg1} alt="" className='footerimg'/>
            </div>
      <div className="sec1" id='aboutsec2'>

        <div className="leftsec">
          <h2>What is Examix?</h2>
          {/* <div className="seewhy">We make online proctoring simple, easy, and human.</div> */}
          <div className="seewhyinfo" id='absec2left'>
          Examix is an online platform that allows teachers to create multiple-choice question (MCQ) tests for
their students. Our platform includes a user-friendly exam creation tool and a proctoring feature
that ensures academic integrity. Our detailed analytics provide teachers with insights into students&#39;
performance, helping them to assess their students&#39; knowledge, identify areas of improvement, and
track their progress. Examix is a comprehensive solution that helps teachers to create, proctor, and
evaluate MCQ tests in a secure and efficient way.
          </div>
        </div>
        <div className="rightsec" id='absec2right'>
          <img src={whatis} alt="" id="thirdimg" />
        </div>

      </div>
      <div>
                <img src={homeimg1} alt="" className='footerimg' style={{transform: "rotateX(180deg)"}}/>
            </div>

      <div className="outerhead" id='ourstoryhead'>
        <div id='heading1'>Our Story</div>
      </div>
      <div className="sec1" id='ourstory'>
        <div className="rightsec">
          <img src={founders} alt="" id="firstimg" />
        </div>
        <div className="leftsec" id='founders'>
          <h2>Our Founders</h2>
          {/* <div className="seewhy">We make online proctoring simple, easy, and human.</div> */}
          <div className="seewhyinfo">Examix was created by three passionate students Akash, Mahesh and Rohit. As students, they
recognized the challenges of traditional paper-based exams and saw the need for a platform that
would allow teachers to create and proctor multiple-choice question (MCQ) tests online in a secure
and reliable way. Despite having limited resources and no prior experience in software development,
they dedicated themselves to creating a functional and user-friendly platform. Their commitment to
innovation, education, and integrity remains at the core of Examix, and they hope to continue
refining and improving the platform in the future.</div>
        </div>


      </div>
    </div>
    <Footer />
    </>
  )
}
