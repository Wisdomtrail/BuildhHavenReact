import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';  
import BASE_URL from '../../config';
import '../../styles/ViewUsers.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode }  from "jwt-decode";
import defaultImage from '../../assets/img/defaultImage.jpg'
import { Bell } from 'lucide-react'

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    const adminToken = localStorage.getItem("adminToken");
    const adminId = localStorage.getItem('adminId');

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
      
        if (!adminToken) {
          navigate("/admin");
          return;
        }
      
        try {
          const decodedToken = jwtDecode(adminToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            // Token has expired
            localStorage.removeItem("adminToken");
            navigate("/admin");
          }
        } catch (error) {
          // If token decoding fails
          localStorage.removeItem("adminToken");
          navigate("/admin");
        }
      }, [navigate]);
      
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
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

        if (adminToken && adminId) fetchAdminDetails();
    }, [adminToken, adminId]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('adminToken');  // Assuming the token is stored in localStorage
                
                const response = await fetch(`${BASE_URL}/user/get/All`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Adding the token in the Authorization header
                    },
                });

                const data = await response.json();
                if (data.message === "Users retrieved successfully") {
                    setUsers(data.users);
                } else {
                    console.log('Failed to fetch users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const editUser = (id) => {
        console.log("Edit User", id);
    };
    
    const deleteUser = (id) => {
        console.log("Delete User", id);
    };

    const viewUser = async (userId) => {
        try {
            const token = localStorage.getItem('adminToken');  // Get token
            const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Including token
                },
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Here, we're assuming that 'data.user' contains the user details, including the orders
                setSelectedUser({
                    ...data,  // Spread user data
                    orders: data.orders || []  // Ensure 'orders' is always an array
                });
            } else {
                console.log('Failed to retrieve user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div className="view-users-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title" onClick={() => { navigate('/admin/dashboard') }}>Admin Dashboard</h1>
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
                        src={admin?.profileImageUrl || defaultImage} // Replace with the admin's profile image URL or a default one
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
            </header><br />
            <h2 className="section-title">Users List</h2>
            <div className="users-table-wrapper">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="user-row">
                            <td>{user._id}</td>  {/* Displaying fullName instead of email */}
                            <td>{user.email}</td>  {/* Displaying email */}
                            <td className="action-icons">
                                <button className="action-btn view-btn" onClick={() => viewUser(user._id)}>
                                    <FaEye /> View
                                </button>
                                <button className="action-btn delete-btn" onClick={() => deleteUser(user._id)}>
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {/* Modal or details section for viewing orders and other user information */}
            {selectedUser && (
                <div className="user-details-modal">
                    <h3>User Details</h3>
                    <p><strong>Full Name:</strong> {selectedUser.fullName}</p>  {/* Display Full Name */}
                    <p><strong>Email:</strong> {selectedUser.email}</p>  {/* Display Email */}
                    <h4>Orders</h4>
                    {selectedUser.orders.length > 0 ? (
                        <ul>
                            {selectedUser.orders.map(order => (
                                <li key={order._id}>
                                    <strong>Order ID:</strong> {order._id} <br />
                                    <strong>Total Amount:</strong> ${order.totalAmount} <br />
                                    <strong>Status:</strong> {order.status} <br />
                                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span>No orders available for this user</span>
                    )}
                    <br /><br />
                    <button className="close-modal" onClick={() => setSelectedUser(null)}>Close</button>
                </div>
            )}
        </div>
    );
};



export default ViewUsers;
