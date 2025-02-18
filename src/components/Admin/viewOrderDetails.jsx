import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import { FaRegCheckCircle, FaTimesCircle, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa'; // Additional icons for styling
import '../../styles/viewOrderDetails.css'; // Make sure to create and style this CSS file
import BASE_URL from '../../config';

const OrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from URL using useParams
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        const response = await axios.get(`${BASE_URL}/product/view-order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });

        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="order-details-container">
      <div className="order-header">
        <h2>Order ID: {order.orderId}</h2>
        <p className="order-status">
          Status: {order.status === 'Pending' ? <FaRegCheckCircle color="orange" /> : <FaTimesCircle color="red" />}
          {order.status}
        </p>
      </div>
      <div className="order-info">
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ₦{order.totalAmount} <FaMoneyBillWave /></p>
        <p><strong>Pickup Method:</strong> {order.pickupMethod}</p>
        <p><strong>Address:</strong> <FaMapMarkerAlt /> {order.address}</p>
      </div>

      <div className="order-products-list">
        <h3>Products</h3>
        {order.products.map((product, index) => (
          <div className="order-product-card" key={index}>
            <img className="order-product-image" src={product.image} alt={product.name} />
            <div className="order-product-info">
              <h4>{product.name}</h4>
              <p><strong>Price:</strong> ₦{product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='order-buttons'>
        <button className='approveOrder'> Approve Order</button>
        <button className='cancelOrder'>Cancel Order</button>
      </div>
    </div>
  );
};

export default OrderDetails;
