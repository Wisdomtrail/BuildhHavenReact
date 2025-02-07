import React, { useState } from "react";
import { FaTruck, FaShippingFast, FaStore, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import Sidebar from "../sideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import DMobileDownbar from "../sideBar/DMobileDownbar";
import "../../styles/DeliveryOptions.css";
import BASE_URL from '../../config';

const DeliveryOptions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderItems } = location.state || { orderItems: [] };

    const [selectedOption, setSelectedOption] = useState("standard");
    const [loading, setLoading] = useState(false);

    const totalProductPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const deliveryFees = {
        standard: totalProductPrice >= 1000000 ? 0 : 2000,
        express: 5000,
        pickup: 0
    };

    const deliveryFee = deliveryFees[selectedOption] || 0;
    const finalTotal = totalProductPrice + deliveryFee;

    const handlePayAtPickup = async () => {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token')
    
        setTimeout(async () => {  // Make setTimeout async
            try {
                const response = await fetch(`${BASE_URL}/user/clearCart/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error("Error:", error);
            }
    
            setLoading(false);
            navigate("/pickup-confirmation");
        }, 2000);
    };
    

    const handleConfirmDelivery = (e) => {
        e.preventDefault();
        navigate("/paymentPage");
    };

    return (
        <>
            <Sidebar />
            <DMobileDownbar />
            <div className="delivery-options-container">
                <h2>Choose Your Delivery Option</h2>

                {loading ? (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                        <p>Processing your request...</p>
                    </div>
                ) : (
                    <>
                        <div className="delivery-options">
                            <div className={`option ${selectedOption === "standard" ? "active" : ""}`}
                                onClick={() => setSelectedOption("standard")}>
                                <FaTruck className="ddicon" />
                                <h3>Standard Delivery</h3>
                                <p>Arrives in 3-5 days. Free for orders over ₦1,000,000.</p>
                            </div>

                            <div className={`option ${selectedOption === "express" ? "active" : ""}`}
                                onClick={() => setSelectedOption("express")}>
                                <FaShippingFast className="icon express" />
                                <h3>Express Delivery</h3>
                                <p>Arrives in 1-2 days. Extra charge applies.</p>
                            </div>

                            <div className={`option ${selectedOption === "pickup" ? "active" : ""}`}
                                onClick={() => setSelectedOption("pickup")}>
                                <FaStore className="icon store" />
                                <h3>Store Pickup</h3>
                                <p>Pick up from the nearest store in 24 hours.</p>
                            </div>
                        </div>

                        <div className="order-summary">
                            <h3><FaShoppingCart className="icon" /> Order Summary</h3>
                            <div className="order-summary-item">
                                <span className="label"><FaShoppingCart className="icon" /> Total Products Price:</span>
                                <span className="value">₦{totalProductPrice.toLocaleString()}</span>
                            </div>

                            <div className="order-summary-item">
                                <span className="label"><FaShippingFast className="icon" /> Delivery Fee:</span>
                                <span className="value">₦{deliveryFee.toLocaleString()}</span>
                            </div>

                            <div className="order-summary-item">
                                <span className="label"><FaDollarSign className="icon" /> Grand Total:</span>
                                <span className="value">₦{finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        {selectedOption === "standard" || selectedOption === "express" ? (
                            <div className="delivery-form">
                                <h3>Enter Your Delivery Details</h3>
                                <form onSubmit={handleConfirmDelivery}>
                                    <input type="text" placeholder="Full Name" required />
                                    <input type="tel" placeholder="Phone Number" required />
                                    <input type="text" placeholder="Street Address" required />
                                    <input type="text" placeholder="City" required />
                                    <input type="text" placeholder="State" required />
                                    <input type="text" placeholder="ZIP Code" required />
                                    <button type="submit">Confirm Delivery</button>
                                </form>
                            </div>
                        ) : null}

                        {selectedOption === "pickup" ? (
                            <div className="pickup-info">
                                <h3>Pickup Location</h3>
                                <p>
                                    📍 <a href="https://www.google.com/maps/search/?api=1&query=175+Abeokuta+express+way+Iyana+Ipaja+Lagos"
                                        target="_blank" rel="noopener noreferrer"
                                        className="map-link">
                                        175, Abeokuta express way Iyana Ipaja Lagos
                                    </a>
                                </p>
                                <p>🕒 Pickup Hours: 9 AM - 7 PM</p>
                                <div className="payment-buttons">
                                    <button className="pay-online">Pay Online</button>
                                    <button className="pay-pickup" onClick={handlePayAtPickup}>Pay at Pickup</button>
                                </div>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </>
    );
};

export default DeliveryOptions;
