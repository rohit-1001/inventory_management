import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [userData,setUserData] = useState({
    email:"",
    password:""
  })
  const handleChange = (event) => {
    setUserData({...userData, [event.target.name]:event.target.value})
  }
  const navigate = useNavigate()
  const loginForm = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/signin', userData)
      if(res.status!==200){
        window.alert(res.data.msg);
      }
      else{
        window.alert(res.data.msg)
        navigate('/')
      }
    } catch (error) {
      window.alert("Invalid Credentials")
    }
  }
  return (
    <>
      <form method='POST'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={userData.email} name='email' onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" value={userData.password} name='password' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={loginForm}>Submit</button>
        </form>
    </>
  )
}

export default Login
