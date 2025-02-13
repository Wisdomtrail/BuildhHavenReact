import React from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import '../../styles/ThisWeekOrders.css';

const ThisWeekOrders = () => {
  const orders = [
    { id: '#1023', customer: 'John Doe', total: '$123.45', status: 'Pending', icon: <Clock /> },
    { id: '#1024', customer: 'Jane Smith', total: '$78.90', status: 'Completed', icon: <CheckCircle /> },
    { id: '#1025', customer: 'Sarah Lee', total: '$45.00', status: 'Cancelled', icon: <XCircle /> },
    { id: '#1026', customer: 'Chris Evans', total: '$300.20', status: 'Completed', icon: <CheckCircle /> },
  ];

  return (
    <div className="this-week-orders">
      <h1 className="orders-title">This Week's Orders</h1>
      <div className="orders-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.icon} {order.status}
                  </span>
                </td>
                <td>
                  <button className="view-button">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThisWeekOrders;
