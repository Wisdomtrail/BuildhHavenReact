import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import BASE_URL from "../../config";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(async () => {
            const response = await fetch(`${BASE_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: e.target.fullName.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    confirmPassword: e.target.confirmPassword.value,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                toast.success("Registration successful! Please Login!");
                navigate('/login')
            } else {
                toast.error(data.message);
            }

            setLoading(false);
        }, 3000);
    };

    return (
        <>
            <Header />
            <div className="body">
                <div className="wrapper" style={{ height: "550px" }}>
                    <div className="form-box login">
                        <form action="" className="form" onSubmit={handleSubmit}>
                            <h1>Register</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                                <FaUser className="icon" />
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <FaUser className="icon" />
                            </div>
                            <div className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                            <div className="input-box">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                            <button type="submit" className={loading ? "loading" : ""}>
                                {loading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    "Register"
                                )}
                            </button>

                            <div className="register-link">
                                <p>
                                    Already have an account? <a href="/login">Login</a>
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

export default Registration;