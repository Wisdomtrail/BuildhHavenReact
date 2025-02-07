import '../../styles/Cart.css';
import React, { useState, useEffect } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import { FaTrash, FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config';

const Cart = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [orderItems, setOrderItems] = useState([]);
    const buttonStyle = {
        margin: "5px",
        padding: "5px 10px",
        backgroundColor: "#FD8F00",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const fetchCart = async () => {
            try {
                const cartResponse = await fetch(`${BASE_URL}/user/getCart/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const cartData = await cartResponse.json();

                if (cartData.cart) {
                    const updatedItems = await Promise.all(cartData.cart.map(async (item) => {
                        const productResponse = await fetch(`${BASE_URL}/product/${item.productId}`, {
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
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId, token]);

    

    const handleAddItem = () => {
        navigate("/products");
    };const handleQuantityChange = async (productId, action) => {
        setOrderItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === productId) {
                    let newQuantity = item.quantity;
    
                    if (action === 'increase') {
                        newQuantity += 1;
                    } else if (action === 'decrease') {
                        newQuantity -= 1;
                    }
    
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    
        if (action === 'decrease') {
            const itemToUpdate = orderItems.find(item => item.id === productId);
            if (itemToUpdate && itemToUpdate.quantity === 1) {
                await handleDeleteItem(productId);
            }
        }
    };
    const handleCancelOrder = () => {
        
        toast.info(
            <div>
                <p>Are you sure you want to cancel this order? 🤔</p>
                <button onClick={() => confirmCancel(userId)} style={buttonStyle}>Yes</button>
                <button onClick={toast.dismiss} style={{ ...buttonStyle, backgroundColor: "gray" }}>No</button>
            </div>,
            {
                position: "top-center",
                autoClose: false, // Keep it open until user clicks
                closeOnClick: false, // Prevent accidental closing
                draggable: false
            }
        );
    };
    
    const confirmCancel = async (userId) => {
        toast.dismiss(); // Close the confirmation toast
    
        try {
            const response = await fetch(`${BASE_URL}/user/clearCart/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                toast.success("Order successfully canceled ✅", { position: "top-right", autoClose: 2000 });
                navigate('/products')
            } else {
                toast.error("Failed to cancel order ❌", { position: "top-right", autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Error canceling order!", { position: "top-right", autoClose: 2000 });
            console.error("Error:", error);
        }
    };

    const handleConfirmOrder = () => {
        if (orderItems.length === 0) {
            toast.error("Your cart is empty!", { position: "top-right", autoClose: 2000 });
            return;
        }
    
        navigate("/delivery-options", { state: { orderItems } });
    };

    const handleDeleteItem = async (productId) => {
        setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
        if (!userId || !token) {
            toast.error("User not authenticated!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
            });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/user/deleteCartItem/${userId}/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
                toast.success("Item removed from cart ✔️", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            } else {
                toast.error("Failed to remove item ❌", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            toast.error("Error deleting cart item!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
            });
            console.error("Error deleting cart item:", error);
        }
    };

    const totalQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const viewProduct = (item) => {
        const product = {
            _id: item.id, // Ensure the ID format is consistent
            name: item.name,
            description: item.description,
            price: item.price,
            images: [item.image], // Ensure images is an array like in product.jsx
            quantity: item.quantity // Ensure quantity exists
        };

        navigate(`/view-product/${item.id}`, { state: { product } });
    };


    return (
        <>
            <Sidebar />
            <DMobileDownbar />

            <div className="cart-container">
                <div className="cart-header">
                    <h1 className="cart-title">Cart ({totalQuantity})</h1>
                    <button className="add-item-btn" onClick={handleAddItem}>
                        <FaCartPlus /> Add Item
                    </button>

                </div>

                {loading ? (
                    <div className="loading-container">
                        <p className="loading-text">Loading cart...</p>
                    </div>
                ) : (
                    <div className="cart-details" >
                        {orderItems.length > 0 ? (
                            orderItems.map((item) => (
                                <div key={item.id} className="cart-item" onClick={() => viewProduct(item)}>
                                    <div className="item-image">
                                        <img src={item.image || "path-to-default-image.jpg"} alt={item.name} />
                                    </div>
                                    <div className="item-info">
                                        <p className="item-name">{item.name.slice(0, 14)}...</p>
                                        <p className="item-description">{item.description.slice(0, 50)}...</p>
                                        <p className="item-price">Price: ₦{item.price}</p>

                                        <div className="cart-quantity-controls">
                                            <button className="cart-decrease-btn" onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 'decrease'); }}>
                                                <FaMinus />
                                            </button>
                                            <p className="item-quantity">{item.quantity}</p>
                                            <button className="cart-increase-btn" onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 'increase'); }}>
                                                <FaPlus />
                                            </button>

                                        </div>

                                        <p className="item-total">Total: ₦{item.quantity * item.price}</p>
                                    </div>

                                    <button className="cart-delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}>
                                        <FaTrash />
                                    </button>


                                </div>
                            ))
                        ) : (
                            <p className="empty-cart-message">Your cart is empty.</p>
                        )}

                        <div className="cart-summary">
                            <p className="total-amount">
                                Total Amount: ₦{orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                            </p>

                            <button className="confirm-order" disabled={orderItems.length === 0} onClick={handleConfirmOrder}>
                                Confirm Order
                            </button>

                            <button className="cancel-order" onClick={handleCancelOrder}>
                                Cancel Order
                            </button>

                        </div>
                    </div>
                )}
            </div>
            <ToastContainer /><br /><br /><br /><br />
        </>
    );
};

export default Cart;
