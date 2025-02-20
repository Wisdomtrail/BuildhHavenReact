import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaCopy, FaUser, FaMoneyBillWave } from "react-icons/fa";
import "../../styles/Payment.css";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../../config";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';

const Payment = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));

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
        if (!storedOrder) {
            navigate("/products");
        } else {
            setOrderDetails(storedOrder);
        }
    }, [navigate, token]);

    const handleConfirmPayment = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Get userId for clearing cart

        setTimeout(async () => {
            try {
                const response = await fetch(`${BASE_URL}/public-route/create-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(orderDetails),
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.removeItem("orderDetails");
                    await clearCart(userId);

                    navigate("/deliveryconfirmation");
                } else {
                    alert(data.error || "Failed to confirm payment.");
                }
            } catch (error) {
                console.error("Payment error:", error);
                alert("An error occurred during payment confirmation.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const clearCart = async (userId) => {

        try {
            const response = await fetch(`${BASE_URL}/user/clearCart/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                console.error("Failed to clear cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText("29489924924");
        alert("Account number copied!");
    };

    return (
        <>

            <Sidebar />
            <DMobileDownbar />
            <div className="payment-container">
                <h2>Payment Details</h2>

                <div className="payment-info">
                    <p><FaUniversity className="iconp" /> <strong>Bank:</strong> Zenith Bank</p>
                    <p>
                        <FaMoneyBillWave className="iconp" /> <strong>Account Number:</strong> 1015592854
                        <FaCopy className="copy-icon" onClick={copyToClipboard} />
                    </p>
                    <p><FaUser className="iconp" /> <strong>Account Name:</strong>THE LORD'S FAMOUS GLOBAL </p>
                </div>

                <div className="payment-instructions">
                    <h3>Instructions:</h3>
                    <ul>
                        <li>Transfer the exact total amount to the bank details provided.</li>
                        <li>Ensure to use your Order ID as the payment reference.</li>
                        <li>Once the transfer is complete, click "Confirm Payment" below.</li>
                    </ul>
                </div>

                {loading ? (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                        <p>Confirming your payment...</p>
                    </div>
                ) : (
                    <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
                        Confirm Payment
                    </button>
                )}
            </div><br />
        </>
    );
};

export default Payment;
