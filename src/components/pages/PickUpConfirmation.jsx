import React from "react";
import { FaCheckCircle, FaStore, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/PickupConfirmation.css";

const PickupConfirmation = () => {
    const navigate = useNavigate();
    

    return (
        <div className="pickup-confirmation">
            <div className="confirmation-box">
                <FaCheckCircle className="success-icon" />
                <h2>Order Confirmed!</h2>
                <p className="pc">Your order has been successfully placed for pickup.</p>

                <div className="pickup-details">
                    <div className="pickup-item">
                        <FaStore className="icon" />
                        <span>Pickup Location: <strong>175, Abeokuta Express Way, Iyana Ipaja, Lagos</strong></span>
                    </div>
                    <div className="pickup-item">
                        <FaClock className="icon" />
                        <span>Pickup Time: <strong>9 AM - 7 PM</strong></span>
                    </div>
                    <div className="pickup-item">
                        <FaMapMarkerAlt className="icon" />
                        <a href="https://www.google.com/maps/search/?api=1&query=175+Abeokuta+express+way+Iyana+Ipaja+Lagos"
                            target="_blank" rel="noopener noreferrer" className="map-link">
                            View on Google Maps
                        </a>
                    </div>
                </div>

                <button className="back-home" onClick={() => navigate("/products")}>Back to Home</button>
            </div>
        </div>
    );
};

export default PickupConfirmation;
