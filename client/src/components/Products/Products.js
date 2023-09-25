import React, { useState } from "react";
import Card from "../UI/Card";
import ProductsFilter from "./ProductsFilter";
import "./Products.css";
import ProductsList from "./ProductsList";

const Products = (props) => {
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
        <ProductsFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
       <ProductsList items={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Products;
