import '../../styles/Cart.css';
import React, { useState, useEffect } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa"; // Import delete and quantity icons from react-icons

const Cart = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartResponse = await fetch(`http://localhost:3001/user/getCart/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const cartData = await cartResponse.json();

                if (cartData.cart) {
                    const updatedItems = await Promise.all(cartData.cart.map(async (item) => {
                        const productResponse = await fetch(`http://localhost:3001/product/${item.productId}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        });
                        const productData = await productResponse.json();
                        return {
                            id: item.productId,
                            name: productData.product.name,
                            description: productData.product.description,
                            price: productData.product.price,
                            quantity: item.quantity,
                            image: productData.product.images[0],
                        };
                    }));

                    setOrderItems(updatedItems);
                }
            } catch (error) {
                console.error("Error fetching cart or product data:", error);
            }
        };

        fetchCart();
    }, [userId, token]);

    const handleQuantityChange = (productId, action) => {
        setOrderItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === productId) {
                    let newQuantity = item.quantity;
                    if (action === 'increase') {
                        newQuantity += 1;
                    } else if (action === 'decrease') {
                        newQuantity = Math.max(0, newQuantity - 1);
                    }

                    if (newQuantity === 0) {
                        return null;
                    }

                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item !== null);
        });
    };

    const handleDeleteItem = (productId) => {
        setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const totalQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <Sidebar />
            <DMobileDownbar />

            <div className="cart-container">
                <h1 className="cart-title">Cart ({totalQuantity})</h1>
                <div className="cart-details">
                    {orderItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img src={item.image || "path-to-default-image.jpg"} alt={item.name} />
                            </div>
                            <div className="item-info">
                                <p className="item-name">{item.name.slice(0, 14)}...</p>
                                <p className="item-description">{item.description.slice(0, 50)}...</p> {/* Shortened text */}
                                <p className="item-price">Price: ₦{item.price}</p>

                                <div className="cart-quantity-controls">
                                    <button
                                        className="cart-decrease-btn"
                                        onClick={() => handleQuantityChange(item.id, 'decrease')}
                                    >
                                        <FaMinus />
                                    </button>
                                    <p className="item-quantity">{item.quantity}</p>
                                    <button
                                        className="cart-increase-btn"
                                        onClick={() => handleQuantityChange(item.id, 'increase')}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <p className="item-total">Total: ₦{item.quantity * item.price}</p>
                            </div>

                            <button className="cart-delete-btn" onClick={() => handleDeleteItem(item.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <p className="total-amount">
                            Total Amount: ₦{orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}
                        </p>
                        <button className="confirm-order">Confirm Order</button>
                        <button className="cancel-order">Cancel Order</button>
                    </div>
                </div>
            </div><br /><br /><br />
        </>
    );
};

export default Cart;
