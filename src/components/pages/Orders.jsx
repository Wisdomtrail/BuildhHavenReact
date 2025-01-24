import React, { useState } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/orders.css'; // Ensure to import the CSS

const Orders = () => {
  const [orderItems, setOrderItems] = useState([
    { id: 'product1', name: 'Product 1', price: 20, quantity: 2 },
    { id: 'product2', name: 'Product 2', price: 50, quantity: 1 }
  ]);

  const handleQuantityChange = (productId, action) => {
    setOrderItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          let newQuantity = item.quantity;
          if (action === 'increase') {
            newQuantity += 1;
          } else if (action === 'decrease') {
            newQuantity = Math.max(0, newQuantity - 1); // Prevent quantity from going below 0
          }

          // Remove the item if quantity becomes 0
          if (newQuantity === 0) {
            return null;
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item !== null); // Filter out any null items
    });
  };

  return (
    <>
      <Sidebar />
      <DMobileDownbar />

      <div className="order-container">
        <h1 className="order-title">Your Orders</h1>

        <div className="order-details">
          <h2>Order Summary</h2>

          {orderItems.map(item => (
            <div key={item.id} className="order-item">
              <div className="item-image">
                <img src="path-to-your-image.jpg" alt={item.name} />
              </div>
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-price">Price: ${item.price}</p>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                  >
                    -
                  </button>
                  <p className="item-quantity">{item.quantity}</p>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                  >
                    +
                  </button>
                </div>

                <p className="item-total">Total: ${item.quantity * item.price}</p>
              </div>
            </div>
          ))}

          <div className="order-summary">
            <p className="total-amount">
              Total Amount: ${orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}
            </p>
            <button className="confirm-order">Confirm Order</button>
            <button className="cancel-order">Cancel Order</button>
          </div>
        </div>
      </div><br /><br /><br />
    </>
  );
};

export default Orders;
