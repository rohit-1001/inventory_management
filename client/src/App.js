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
import CDashboard from './Pages/CDashboard';
import CProfile from './Pages/CProfile';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';
// import { useContext, useReducer } from 'react';
// import {reducer, initialState} from '../reducer/UserReducer'

// export const context = createContext();

const DUMMY_ORDERS = [
  {
    id: "e1",
    date: new Date(2021, 7, 14),
    customer: "Godzilla",
    saleschannel: "flame cells",
    count: 34,
    status: "fail",
  },
  {
    id: "e2",
    date: new Date(2021, 7, 15),
    customer: "King Kong",
    saleschannel: "flame cells",
    count: 45,
    status: "pending",
  },
  {
    id: "e3",
    date: new Date(2022, 7, 16),
    customer: "Mothra",
    saleschannel: "fire wings",
    count: 22,
    status: "success",
  },
  {
    id: "e4",
    date: new Date(2020, 7, 17),
    customer: "Rodan",
    saleschannel: "inferno sales",
    count: 30,
    status: "fail",
  },
  {
    id: "e5",
    date: new Date(2020, 7, 18),
    customer: "Gamera",
    saleschannel: "blaze mart",
    count: 28,
    status: "success",
  },
  {
    id: "e6",
    date: new Date(2022, 7, 19),
    customer: "Mechagodzilla",
    saleschannel: "heat deals",
    count: 40,
    status: "fail",
  },
  {
    id: "e7",
    date: new Date(2020, 7, 20),
    customer: "Anguirus",
    saleschannel: "lava goods",
    count: 15,
    status: "success",
  },
  {
    id: "e8",
    date: new Date(2020, 7, 21),
    customer: "Destoroyah",
    saleschannel: "scorch sales",
    count: 50,
    status: "fail",
  },
  {
    id: "e9",
    date: new Date(2019, 7, 22),
    customer: "Gigan",
    saleschannel: "flame mart",
    count: 37,
    status: "success",
  },
  {
    id: "e10",
    date: new Date(2020, 7, 23),
    customer: "Biollante",
    saleschannel: "blaze deals",
    count: 18,
    status: "success",
  },
  {
    id: "e11",
    date: new Date(2020, 7, 24),
    customer: "SpaceGodzilla",
    saleschannel: "inferno mart",
    count: 32,
    status: "fail",
  }
];

const DUMMY_PRODUCTS = [
  {
    "id": "p1",
    "date": new Date(2020, 7, 24),
    "vendor": "Adwait",
    "p_name": "Shampoo"
  },
  {
    "id": "p2",
    "date": new Date(2020, 8, 15),
    "vendor": "Aanya",
    "p_name": "Conditioner"
  },
  {
    "id": "p3",
    "date": new Date(2020, 9, 8),
    "vendor": "Beauty Essentials",
    "p_name": "Soap"
  },
  {
    "id": "p4",
    "date": new Date(2020, 10, 3),
    "vendor": "Dental Care Pro",
    "p_name": "Toothbrush"
  },
  {
    "id": "p5",
    "date": new Date(2020, 11, 19),
    "vendor": "Luxe Spa",
    "p_name": "Body Lotion"
  },
  {
    "id": "p6",
    "date": new Date(2021, 0, 7),
    "vendor": "StyleMasters",
    "p_name": "Hair Gel"
  },
  {
    "id": "p7",
    "date": new Date(2021, 1, 2),
    "vendor": "Skincare Solutions",
    "p_name": "Face Wash"
  },
  {
    "id": "p8",
    "date": new Date(2021, 2, 12),
    "vendor": "SafeHands",
    "p_name": "Hand Sanitizer"
  },
  {
    "id": "p9",
    "date": new Date(2021, 3, 5),
    "vendor": "Groom & Glide",
    "p_name": "Shaving Cream"
  },
  {
    "id": "p10",
    "date": new Date(2021, 4, 20),
    "vendor": "Fresh Scent",
    "p_name": "Deodorant"
  }
];


const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/codb" element={<CDashboard />} />
      <Route path="/copr" element={<CProfile />} />
      <Route path="/orders" element={<Orders items={DUMMY_ORDERS} />} />
      <Route path="/products" element={<Products items={DUMMY_PRODUCTS} />} />
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
      <Routing />
      {/* </context.Provider>       */}
    </>
  );
}

export default App;