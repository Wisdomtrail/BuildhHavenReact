import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package, Users, DollarSign, Clock } from 'lucide-react';
import '../../styles/Admin.css';
import BASE_URL from '../../config';

const AdminDashboard = () => {
  // State variables
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]); // State for recent orders

  // Token (retrieve from localStorage or context)
  const token = localStorage.getItem('adminToken');

  // Fetch data from APIs
  useEffect(() => {
    const fetchCountsAndOrders = async () => {
      try {
        // Headers for authentication
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Fetch order count for this week
        const orderResponse = await fetch(`${BASE_URL}/product/getOrder-count/thisWeek`, { headers });
        const orderData = await orderResponse.json();
        setOrderCount(orderData.orderCount || 0);

        // Fetch user count
        const userResponse = await fetch(`${BASE_URL}/user/get/All-count`, { headers });
        const userData = await userResponse.json();
        setUserCount(userData.userCount || 0);

        // Fetch product count
        const productResponse = await fetch(`${BASE_URL}/product/count-product`, { headers });
        const productData = await productResponse.json();
        setProductCount(productData.productCount || 0);

        // Fetch recent orders
        const ordersResponse = await fetch(`${BASE_URL}/product/getOrder/thisWeek`, { headers });
        const ordersData = await ordersResponse.json();

        // Calculate pending orders
        const pendingCount = ordersData.filter(order => order.status === 'Pending').length;
        setPendingOrderCount(pendingCount);

        // Update recent orders state
        setRecentOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountsAndOrders();
  }, [token]);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </header>

      {/* Cards Section */}
      <div className="cards-section">
        <div className="card">
          <div className="card-icon blue-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="card-details">
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
                <td colSpan="5" style={{ textAlign: 'center' }}>
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
