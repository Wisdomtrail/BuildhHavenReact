import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegCheckCircle, FaTimesCircle, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/viewOrderDetails.css';
import BASE_URL from '../../config';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null); // To manage button state

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        const response = await fetch(`${BASE_URL}/product/view-order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleApproveOrder = async () => {
    try {
      setProcessing('approving'); // Set processing state
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/product/approve-order/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve order');
      }

      toast.success('Order approved successfully!');
      setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
    } catch (error) {
      toast.error('Failed to approve order');
    } finally {
      setProcessing(null); // Reset processing state
    }
  };

  const handleCancelOrder = async () => {
    try {
      setProcessing('cancelling'); // Set processing state
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/product/cancel-order/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      toast.success('Order canceled successfully!');
      setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
    } catch (error) {
      toast.error('Failed to cancel order');
    } finally {
      setProcessing(null); // Reset processing state
    }
  };

  const handleDeleteOrder = async () => {
    try {
      setProcessing('deleting'); // Set processing state
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/product/delete-order/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Order deleted successfully!');
      setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
    } catch (error) {
      toast.error('Failed to delete order');
    } finally {
      setProcessing(null); // Reset processing state
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="order-details-container">
      <ToastContainer />
      <div className="order-header">
        <h2>Order ID: {order.orderId}</h2>
        <p className="order-status">
          Status:
          {order.status === 'Pending' ? (
            <FaRegCheckCircle color="orange" />
          ) : order.status === 'Completed' ? (
            <FaRegCheckCircle color="green" />
          ) : (
            <FaTimesCircle color="red" />
          )}
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
      <div className="order-buttons">
        {order.status === 'Completed' || order.status === 'Cancelled' ? (
          <button
            className="deleteOrder"
            onClick={handleDeleteOrder}
            disabled={processing !== null}
          >
            {processing === 'deleting' ? 'Deleting...' : 'Delete Order'}
          </button>
        ) : (
          <>
            <button
              className="approveOrder"
              onClick={handleApproveOrder}
              disabled={processing !== null}
            >
              {processing === 'approving' ? 'Approving...' : 'Approve Order'}
            </button>
            <button
              className="cancelOrder"
              onClick={handleCancelOrder}
              disabled={processing !== null}
            >
              {processing === 'cancelling' ? 'Cancelling...' : 'Cancel Order'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
