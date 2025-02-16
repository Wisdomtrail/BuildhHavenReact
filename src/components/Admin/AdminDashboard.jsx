import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package, Users, Bell, Clock } from 'lucide-react';
import '../../styles/Admin.css';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]); // State for recent orders
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [admin, setAdmin] = useState(null); // Default to null for better conditional rendering

  const token = localStorage.getItem('adminToken');
  const adminId = localStorage.getItem('adminId');

  const ordersThisWeeks = () => {
    navigate('/admin/this-week-orders');
  };

  // Fetch admin details
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const adminResponse = await fetch(`${BASE_URL}/user/getAdmin/${adminId}`, { headers });
        const adminData = await adminResponse.json();
        setNotifications(adminData.admin.notifications)

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

  // Fetch order count
  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${BASE_URL}/product/getOrder-count/thisWeek`, { headers });
        const data = await response.json();
        setOrderCount(data.orderCount || 0);
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };

    if (token) fetchOrderCount();
  }, [token]);

  // Fetch user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${BASE_URL}/user/get/All-count`, { headers });
        const data = await response.json();
        setUserCount(data.userCount || 0);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    if (token) fetchUserCount();
  }, [token]);

  // Fetch product count
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${BASE_URL}/product/count-product`, { headers });
        const data = await response.json();
        setProductCount(data.productCount || 0);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    if (token) fetchProductCount();
  }, [token]);

  // Fetch recent orders and calculate pending order count
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${BASE_URL}/product/getOrder/thisWeek`, { headers });
        const data = await response.json();

        const pendingCount = data.filter(order => order.status === 'Pending').length;
        setPendingOrderCount(pendingCount);
        setRecentOrders(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    if (token) fetchRecentOrders();
  }, [token]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h3 className="dashboard-title">
          Welcome, {admin ? admin.firstName : "Admin"}
        </h3>
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
                  <p className="notification-item">No notifications</p>
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
  
      <div className="cards-section">
        <div className="card">
          <div className="card-icon blue-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="card-details" onClick={ordersThisWeeks}>
            <h2>Orders</h2>
            <p>{orderCount} this week</p>
          </div>
        </div>
  
        <div className="card">
          <div className="card-icon green-icon">
            <Package size={24} />
          </div>
          <div className="card-details">
            <h2>Products</h2>
            <p>{productCount} available</p>
          </div>
        </div>
  
        <div className="card">
          <div className="card-icon orange-icon">
            <Users size={24} />
          </div>
          <div className="card-details">
            <h2>Users</h2>
            <p>{userCount} active</p>
          </div>
        </div>
  
        <div className="card">
          <div className="card-icon purple-icon">
            <Clock size={24} />
          </div>
          <div className="card-details">
            <h2>Pending Orders</h2>
            <p>{pendingOrderCount} pending</p>
          </div>
        </div>
      </div>
  
      {/* Table Section */}
      <div className="table-section">
        <h2>Recent Orders</h2>
        <table>
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
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.fullname}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className="view-button">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No orders found this week.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      <footer className="dashboard-footer">
        <p>&copy; 2025 BuildHaven Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
  
};

export default AdminDashboard;
