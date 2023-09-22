import React, { useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const aboutPage = async () => {
    try {
      const data = await axios.get('/aboutpage',{
        withCredentials: true
      });

      if(data.status!==200){
        throw new Error('No login found')
      }
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
  }

  useEffect(() => {
    aboutPage();
  })

  return (
    <div>
        <p>About page</p>
    </div>
  )
}

export default About
