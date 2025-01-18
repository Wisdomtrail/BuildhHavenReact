import React from "react";
import { FaUser } from "react-icons/fa";
import '../../styles/Login.css'
import { FaLock } from "react-icons/fa";

const Registration = () => {

    return (
        <div className="body">
            <div className="wrapper" style={{ height: '550px' }}>
                <div className="form-box login">
                    <form action="" className="form">
                        <h1>Register</h1>
                        <div className="input-box">
                            <input type="text" name="fullName" placeholder="Full Name" id="fullName" />
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="email" name="email" placeholder="Email" id="email" />
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" name="password" />
                            <FaLock className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Confirm Password" name="confirmPassword" />
                            <FaLock className="icon"/>
                        </div>
                        
                        <button type="submit">Register</button>
                        <div className="register-link">
                            <p>Already have an account? <a href="/login">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration;
