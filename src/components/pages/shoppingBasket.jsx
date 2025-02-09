import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import "../../styles/ShoppingBasket.css"; // Styling

const ShoppingBasket = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cart items from localStorage or API
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        calculateTotal(storedCart);
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item._id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCartItems([]);
        setTotalPrice(0);
    };

    const proceedToCheckout = () => {
        navigate("/delivery-options"); // Redirect to checkout page
    };

    return (
        <div className="shopping-basket">
            <Header />
            <div className="basket-section">
                <h1 className="basket-title">
                    <FaShoppingCart /> Your Shopping Basket
                </h1>
                {cartItems.length === 0 ? (
                    <div className="empty-basket">
                        <p>Your basket is empty. Start adding some products!</p>
                    </div>
                ) : (
                    <div className="cart-items-list">
                        {cartItems.map((product) => (
                            <div className="cart-item" key={product._id}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{product.name}</h3>
                                    <p className="cart-item-price">₦{product.price.toLocaleString()}</p>
                                    <p className="cart-item-quantity">Quantity: {product.quantity}</p>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(product._id)}
                                >
                                    <FaTrashAlt /> Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="checkout-section">
                        <p className="total-price">
                            <strong>Total: </strong>₦{totalPrice.toLocaleString()}
                        </p>
                        <button className="checkout-button" onClick={proceedToCheckout}>
                            Proceed to Checkout
                        </button>
                        <button className="clear-cart-button" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ShoppingBasket;
