import React, { useState } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/orders.css'; // Ensure to import the CSS
import { FaCheckCircle, FaTimesCircle, FaHourglass } from 'react-icons/fa'; // Icons for status

const Orders = () => {
  // Dummy Orders Data
  const dummyOrders = [
    {
      orderId: '12345',
      userId: 'user1',
      items: [
        { productId: 'tool1', quantity: 2 },
        { productId: 'cement1', quantity: 3 }
      ],
      totalAmount: 200,
      orderDate: '2025-02-01',
      status: 'Pending',
    },
    {
      orderId: '12346',
      userId: 'user2',
      items: [
        { productId: 'bricks1', quantity: 10 },
        { productId: 'hammer1', quantity: 1 }
      ],
      totalAmount: 150,
      orderDate: '2025-02-02',
      status: 'Completed',
    },
  ];

  return (
    <div className="orders-page">
      <Sidebar />
      <DMobileDownbar />

      <div className="orders-content">
        <h2>Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userId}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.productId} (Qty: {item.quantity})
                    </div>
                  ))}
                </td>
                <td>{order.totalAmount} USD</td>
                <td>{order.orderDate}</td>
                <td>
                  {/* Status Icons */}
                  {order.status === 'Completed' && <FaCheckCircle className="status-icon completed" />}
                  {order.status === 'Pending' && <FaHourglass className="status-icon pending" />}
                  {order.status === 'Cancelled' && <FaTimesCircle className="status-icon cancelled" />}
                </td>
                <td>
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br /><br />
    </div>
  );
};

export default Orders;
