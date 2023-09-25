import React from "react";
import "./OrdersList.css";
import ItemDate from "../Date/ItemDate";

const OrdersList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="orders-list__fallback">Found no Orders.</h2>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Sales Channel</th>
            <th scope="col">Count</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((order) => (
            <tr>
              <td><ItemDate date={order.date} /></td>
              <td>{order.customer}</td>
              <td>{order.saleschannel}</td>
              <td>{order.count}</td>
              <td style={{
                color: "black",
                backgroundColor: order.status === "success" ? "green" : order.status === "fail" ? "red" : order.status === "pending" ? "yellow" : "white",
                fontWeight: "bold", // Make the text bold
              }}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrdersList;
