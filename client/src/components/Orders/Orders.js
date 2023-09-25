import React, { useState } from "react";
import Card from "../UI/Card";
import OrdersFilter from "./OrdersFilter";
import "./Orders.css";
import OrdersList from "./OrdersList";

const Orders = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  
  return (
    <div>
      <Card className="expenses">
        <OrdersFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
       <OrdersList items={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Orders;
