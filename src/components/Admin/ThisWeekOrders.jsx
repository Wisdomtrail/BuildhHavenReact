import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Bell, ChevronDown } from 'lucide-react';
import '../../styles/ThisWeekOrders.css';

const ThisWeekOrders = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(['New order placed', 'Stock running low', 'System update available']);

  const orders = [
    { id: '#1023', customer: 'John Doe', total: '$123.45', status: 'Pending', icon: <Clock /> },
    { id: '#1024', customer: 'Jane Smith', total: '$78.90', status: 'Completed', icon: <CheckCircle /> },
    { id: '#1025', customer: 'Sarah Lee', total: '$45.00', status: 'Cancelled', icon: <XCircle /> },
    { id: '#1026', customer: 'Chris Evans', total: '$300.20', status: 'Completed', icon: <CheckCircle /> },
  ];

  return (
    <div className="this-week-orders">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="header-actions">
          <div className="notifications-container">
            <div className="notification-bell-wrapper">
              <Bell
                size={24}
                className="notification-bell"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}
            </div>

            {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <p key={index} className="notification-item">
                      {notification}
                    </p>
                  ))
                ) : (
                  <p className="notification-item">No notifications</p>
                )}
              </div>
            )}
          </div>

          <img
            src="https://res.cloudinary.com/dcsvykbiw/image/upload/v1739542046/user_profiles/bxwaugr22pic8elvzrha.jpg" // Replace with admin's profile image URL
            alt="Admin Profile"
            className="profile-image"
          />
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="orders-section">
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
    </div>
  );
};

export default ThisWeekOrders;
