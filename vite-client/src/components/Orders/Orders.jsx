import React from "react";
import Card from "../UI/Card";
import "./Orders.css";
import OrderTable from "./OrderTable";
import { useEffect, useState } from "react";
import axios from "axios";
// const rows = [
//   { id: 1, date: '2019-09-09', customer: 'Jon', saleschannel: 'Flame cells', count: '30', status: 'success' },
// ];

const Orders = (props) => {
  const [allorders, setallorders] = useState([]);
  const [call, setCall] = useState(false);
  const getallOrders = async () => {
    if(props.details.role==="vendor"){
      const c = await axios.get("api/orders_v", {
        withCredentials: true,
      });
      setallorders(c.data);
    }
    else if(props.details.role==="company"){
      const c = await axios.get("api/orders_c", {
        withCredentials: true,
      });
      setallorders(c.data);
    }
  };

  useEffect(() => {
    getallOrders();
  }, []);
  useEffect(() => {
    getallOrders();
    setCall(false)
  }, [call]);

  const orderswithID = allorders.map((order) => ({
    ...order,
    id: order._id, // Assigning _id as the id property
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Orders';
  }, [])
  return (
    <div>
      <Card className="expenses">
        <OrderTable data={{rows:orderswithID, role:props.details.role, setCall}} />
      </Card>
    </div>
  );
};

export default Orders;
