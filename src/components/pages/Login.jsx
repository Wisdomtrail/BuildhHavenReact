import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import Header from "../header/Header";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true); // Show loading spinner
        setIsButtonDisabled(true); // Disable the button on first click

        setTimeout(async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("userId", data.user.id);
                    localStorage.setItem("token", data.token);
                    toast.success("Login successful!");
                    setTimeout(() => {
                        navigate('/products'); 
                    }, 1000);
                } else {
                    toast.error(data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }

            setIsButtonDisabled(false); 
            setLoading(false); 
        }, 2000); 
    };

    return (
        <>
        <Header/>
        
        <div className="body">
            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={handleSubmit} className="form">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="remember-forgot">
                            <div>
                                <input type="checkbox" id="remember-me-checkbox" />
                                <span>Remember me</span>
                            </div>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={loading ? "loading" : ""}
                        >
                            {loading ? (
                                <div className="spinner"></div> // Spinner when loading
                            ) : (
                                "Login"
                            )}
                        </button>
                        <div className="register-link" id="register-link">
                            <p>
                                Don't have an account? <a href="/registration">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    );
};

export default Login;
