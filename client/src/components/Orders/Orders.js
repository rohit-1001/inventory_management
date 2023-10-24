import React from "react";
import Card from "../UI/Card";
import "./Orders.css";
import OrderTable from "./OrderTable";
import { useEffect } from "react";

const rows = [
  { id: 1, date: '2019-09-09', customer: 'Jon', saleschannel: 'Flame cells', count: '30', status: 'success' },
  { id: 2, date: '2020-03-15', customer: 'Alice', saleschannel: 'Aqua Sales', count: '25', status: 'failure' },
  { id: 3, date: '2020-06-22', customer: 'Bob', saleschannel: 'Breeze Mart', count: '40', status: 'pending' },
  { id: 4, date: '2020-11-18', customer: 'Emily', saleschannel: 'Eco Deals', count: '20', status: 'success' },
  { id: 5, date: '2021-02-05', customer: 'David', saleschannel: 'Sunrise Sales', count: '35', status: 'failure' },
  { id: 6, date: '2021-08-30', customer: 'Sophia', saleschannel: 'Crystal Stores', count: '28', status: 'success' },
  { id: 7, date: '2022-12-10', customer: 'Olivia', saleschannel: 'Wave World', count: '42', status: 'pending' },
  { id: 8, date: '2023-07-25', customer: 'Liam', saleschannel: 'Glow Goods', count: '22', status: 'success' },
  { id: 9, date: '2023-05-14', customer: 'Emma', saleschannel: 'Sky Sales', count: '32', status: 'failure' },
  { id: 10, date: '2024-01-03', customer: 'Noah', saleschannel: 'Star Mart', count: '38', status: 'pending' },
];




const Orders = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Orders';
  }, [])
  return (
    <div>
      <Card className="expenses">
        <OrderTable data={rows} />
      </Card>
    </div>
  );
};

export default Orders;
