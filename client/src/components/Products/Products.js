import React from "react";
import Card from "../UI/Card";
import "./Products.css";
import ProductTable from "./ProductTable";

const rows = [
  { id: 1, date: '2019-09-09', vendor: 'Jon', productName: 'Shampoo' },
  { id: 2, date: '2020-03-15', vendor: 'Alice', productName: 'Soap' },
  { id: 3, date: '2020-06-22', vendor: 'Bob', productName: 'Toothpaste' },
  { id: 4, date: '2020-11-18', vendor: 'Emily', productName: 'Body Lotion' },
  { id: 5, date: '2021-02-05', vendor: 'David', productName: 'Conditioner' },
  { id: 6, date: '2021-08-30', vendor: 'Sophia', productName: 'Face Wash' },
  { id: 7, date: '2022-12-10', vendor: 'Olivia', productName: 'Hand Sanitizer' },
  { id: 8, date: '2023-07-25', vendor: 'Liam', productName: 'Shower Gel' },
  { id: 9, date: '2023-05-14', vendor: 'Emma', productName: 'Perfume' },
];

const Products = () => {
  return (
    <div>
      <Card className="products">
       <ProductTable data={rows} />
      </Card>
    </div>
  );
};

export default Products;
