import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Eye, MapPin, Package, ShoppingCart, Bell } from "lucide-react";
import "../../styles/ThisWeekOrders.css";
import BASE_URL from "../../config";
import { useNavigate } from 'react-router-dom';
;
const ThisWeekOrders = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null); // Default to null for better conditional rendering
  const [error, setError] = useState("");

  
  const token = localStorage.getItem('adminToken');
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const adminResponse = await fetch(`${BASE_URL}/user/getAdmin/${adminId}`, { headers });
        const adminData = await adminResponse.json();
        setNotifications(adminData.admin.notifications);

        if (adminResponse.ok) {
          setAdmin(adminData.admin);
        } else {
          console.error('Failed to fetch admin details:', adminData.message);
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    if (token && adminId) fetchAdminDetails();
  }, [token, adminId]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken"); // Retrieve the token from localStorage
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(BASE_URL+"/product/getOrder/thisWeek", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });


        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="this-week-orders">
      <header className="dashboard-header">
        <h1 className="dashboard-title" onClick={() => {navigate('/admin/dashboard')}}>Admin Dashboard</h1>
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
                      {notification.message}
                    </p>
                  ))
                ) : (
                  <p className="notification-item">No new notifications</p>
                )}
              </div>
            )}
          </div>

          <img
            src={admin?.profileImageUrl || "default-profile.jpg"} // Replace with the admin's profile image URL or a default one
            alt="Admin Profile"
            className="profile-image"
          />
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("adminId");
              window.location.href = '/admin';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="orders-section">
        <h1 className="orders-title">This Week's Orders</h1>
        <div className="orders-container">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Pickup Method</th>
                  <th>Address</th>
                  <th>Order Date</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.fullname}</td>
                    <td>₦{order.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status === "Pending" && <Clock />}
                        {order.status === "Completed" && <CheckCircle />}
                        {order.status === "Cancelled" && <XCircle />}
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className="pickup-method">
                        <MapPin size={16} /> {order.pickupMethod}
                      </span>
                    </td>
                    <td>{order.address}</td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>
                      {order.products.length > 0 ? (
                        <ul className="product-list">
                          {order.products.map((product) => (
                            <li key={product._id} className="product-item">
                              <Package size={16} /> {product.name} (₦{product.price.toLocaleString()} x {product.quantity})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No products"
                      )}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ThisWeekOrders;
