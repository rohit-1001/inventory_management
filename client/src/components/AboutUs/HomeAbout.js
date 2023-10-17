import React from 'react'
import Navbar from './Navbar'
import About from './About'
import Testimonials from './Testimonials'
import Demo from './Demo'
import Picture from './Picture'

function HomeAbout() {
  return (
    <div>
    <Picture/>
      <Navbar />
      <About />
      <Testimonials />
      <Demo />
    </div>
  );
}

export default HomeAbout;
