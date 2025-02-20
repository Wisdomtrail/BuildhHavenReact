import React, { useState, useEffect } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import { jwtDecode } from "jwt-decode";
import '../../styles/orders.css'; // Ensure to import the CSS
import { FaCheckCircle, FaTimesCircle, FaHourglass } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
   
       if (!token) {
         navigate("/login");
         return;
       }
     
       try {
         const decodedToken = jwtDecode(token);
         const currentTime = Date.now() / 1000;
         if (decodedToken.exp < currentTime) {
           localStorage.removeItem("token");
           navigate("/login");
         }
       } catch (error) {
         localStorage.removeItem("token");
         navigate("/login");
       }

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/getOrder/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Error fetching orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [userId, token, navigate]); // Added token to dependency array

  return (
    <div className="orders-page">
      <Sidebar />
      <DMobileDownbar />

      <div className="orders-content">
        <h2>My Orders</h2>

        {loading ? (
          <div>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">No orders found.</div> // Only affects the orders-content section
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={index}>
                        {product.name} (Qty: {product.quantity})
                      </div>
                    ))}
                  </td>
                  <td>{order.totalAmount} NAIRA</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    {order.status === 'Completed' && <FaCheckCircle className="status-icon completed" />}
                    {order.status === 'Pending' && <FaHourglass className="status-icon pending" />}
                    {order.status === 'Cancelled' && <FaTimesCircle className="status-icon cancelled" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div><br /><br />
    </div>
  );
};

export default Orders;
