import React from "react";
import "./ProductsList.css";
import ItemDate from "../Date/ItemDate";

const ProductsList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="orders-list__fallback">Found no products.</h2>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Vendor</th>
            <th scope="col">Product Name</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td><ItemDate date={product.date} /></td>
              <td>{product.vendor}</td>
              <td>{product.p_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsList;
