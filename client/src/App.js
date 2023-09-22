import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
// import Logout from './components/Logout';
import NotFound from './components/NotFound';
// import { useContext, useReducer } from 'react';
// import {reducer, initialState} from '../reducer/UserReducer'

// export const context = createContext();
const Routing = () => {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {/* <context.Provider value={{state, dispatch}}> */}
        <Navbar />
        <Routing/>  
      {/* </context.Provider>       */}
    </>
  );
}

export default App;