import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { User, Lock } from "lucide-react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "../../styles/AdminLogin.css";
import BASE_URL from "../../config";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner

        try {
            const response = await fetch(BASE_URL+"/public-route/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Something went wrong");
                setSuccess("");
                setLoading(false); // Hide loading spinner
            } else {
                const data = await response.json();
                setSuccess("Login successful!");
                setError("");

                // Save token or perform other actions
                localStorage.setItem("adminToken", data.token);

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    setLoading(false); // Hide loading spinner
                    navigate("/admin/dashboard");
                }, 2000);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Internal server error. Please try again later.");
            setSuccess("");
            setLoading(false); // Hide loading spinner
        }
    };


    return (
        <>
            <Header />
            <div className="admin-login__container">
                <div className="admin-login__card">
                    <h2 className="admin-login__title">Admin Login</h2>

                    {/* Show loading spinner if loading */}
                    {loading ? (
                        <div className="admin-login__spinner">
                            <div className="admin-login__loading-text">Loading...</div>
                        </div>
                    ) : (
                        <form className="admin-login__form" onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="admin-login__input-group">
                                <div className="admin-login__icon">
                                    <User size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="admin-login__input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="admin-login__input-group">
                                <div className="admin-login__icon">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="admin-login__input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <button className="admin-login__button" type="submit">
                                Login
                            </button>
                        </form>
                    )}

                    {/* Error and Success Messages */}
                    {error && <p className="admin-login__error-message">{error}</p>}
                    {success && <p className="admin-login__success-message">{success}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminLogin;
