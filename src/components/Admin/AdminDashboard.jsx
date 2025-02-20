import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package, Users, Bell, Clock } from 'lucide-react';
import '../../styles/Admin.css';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from '../../assets/img/defaultImage.jpg'
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]); // State for recent orders
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [uploading, setUploading] = useState(false);


  const token = localStorage.getItem('adminToken');
  const adminId = localStorage.getItem('adminId');

  const ordersThisWeeks = () => {
    navigate('/admin/this-week-orders');
  };
  const manageProducts = () => {
    navigate('/admin/manage-product');
  }

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const adminResponse = await fetch(`${BASE_URL}/user/getAdmin/${adminId}`, { headers });
        const adminData = await adminResponse.json();

        if (adminResponse.ok) {
          // Filter unread notifications and set the count
          const unreadNotifications = adminData.admin.notifications.filter(
            (notification) => !notification.isRead
          );

          setNotifications(unreadNotifications); // Store only unread notifications
          setAdmin(adminData.admin);
        } else {
          console.error("Failed to fetch admin details:", adminData.message);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
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

  const markAsRead = async () => {
    try {
      const adminId = localStorage.getItem('adminId'); // Get adminId from localStorage
      const token = localStorage.getItem('adminToken'); // Get token for authentication

      if (!adminId || !token) {
        console.error("Admin ID or token is missing.");
        return;
      }
      const response = await fetch(`${BASE_URL}/user/${adminId}/notifications/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Notifications marked as read:", data.notifications);
        setNotifications([]);
      } else {
        console.error("Failed to mark notifications as read:", data.message);
        console.log("Backend message:", data.message); // Log the backend message
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleProfileImageClick = () => {
    setShowProfileModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true); // Change button text to "Uploading..."

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(`${BASE_URL}/user/upload-admin-profile-image/${adminId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile image updated successfully:", data);
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          profileImageUrl: data.profileImageUrl,
        }));
        toast.success("Profile image updated successfully!");
        setShowProfileModal(false); // Close the modal
      } else {
        console.error("Failed to update profile image:", data.message);
        alert("Failed to upload profile image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };


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
                onClick={() => {
                  if (showNotifications && notifications.length > 0) {
                    // Only mark as read when closing the dropdown while it was open
                    markAsRead();
                  }
                  setShowNotifications(!showNotifications); // Toggle the dropdown
                }}
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
            src={admin?.profileImageUrl || defaultImage}
            alt="Admin Profile"
            className="profile-image"
            onClick={handleProfileImageClick}
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
        <div className="card" onClick={ordersThisWeeks}>
          <div className="card-icon blue-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="card-details" >
            <h2>Orders</h2>
            <p>{orderCount} this week</p>
          </div>
        </div>

        <div className="card" onClick={manageProducts}>
          <div className="card-icon green-icon">
            <Package size={24} />
          </div>
          <div className="card-details">
            <h2>Products</h2>
            <p>{productCount} available</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate('/admin/view-users')}>
          <div className="card-icon orange-icon">
            <Users size={24} />
          </div>
          <div className="card-details">
            <h2>Users</h2>
            <p>{userCount} active</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate('/admin/pending-orders')}>
          <div className="card-icon purple-icon">
            <Clock size={24} />
          </div>
          <div className="card-details">
            <h2>Pending Orders</h2>
            <p>{pendingOrderCount} pending</p>
          </div>
        </div>
      </div>


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
                    <Link to={`/admin/view-order-details/${order.orderId}`}>
                      <button className="view-button">View</button>
                    </Link>
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
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            className="profile-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="profile-modal"
              initial={{ scale: 0.5, y: '-50%', x: '-50%' }}
              animate={{ scale: 1, y: '-50%', x: '-50%' }}
              exit={{ scale: 0.5, y: '-50%', x: '-50%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <img
                src={admin?.profileImageUrl || 'default-profile.jpg'}
                alt="Admin Profile"
                className="modal-profile-image"
              />

              <button
                className="profile-button"
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                {uploading ? 'Uploading...' : admin?.profileImageUrl ? 'Change Profile Image' : 'Choose Profile Image'}
              </button>
              <input
                type="file"
                id="profileImageInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleProfileImageUpload}
              />

              <button className="close-modal-button" onClick={closeModal}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="dashboard-footer">
        <p>&copy; 2025 BuildHaven Admin Dashboard. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );

};

export default AdminDashboard;
