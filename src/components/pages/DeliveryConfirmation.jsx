import { useEffect } from "react";
import { FaCheckCircle, FaTruck, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/DeliveryConfirmation.css";

const DeliveryConfirmation = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);
    return (
        <div className="delivery-confirmation">
            <div className="confirmation-box">
                <FaCheckCircle className="success-icon" />
                <h2>Order Confirmed!</h2>
                <p className="dc">Your order is on its way and will be delivered soon.</p>

                <div className="delivery-details">
                    <div className="delivery-item">
                        <FaTruck className="icon" />
                        <span>Delivery Method: <strong>Home Delivery</strong></span>
                    </div>
                    <div className="delivery-item">
                        <FaClock className="icon" />
                        <span>Estimated Time: <strong>2 - 4 Business Days</strong></span>
                    </div>
                    <div className="delivery-item">
                        <FaMapMarkerAlt className="icon" />
                        <span>Delivery Address: <strong>Your provided address</strong></span>
                    </div>
                </div>

                <button className="back-home" onClick={() => navigate("/products")}>Back to Home</button>
            </div>
        </div>
    );
};

export default DeliveryConfirmation;
