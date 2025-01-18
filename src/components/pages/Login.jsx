import React from "react";
import { FaUser } from "react-icons/fa";
import '../../styles/Login.css'
import { FaLock } from "react-icons/fa";
const Login = () => {


    return (
       <div className="body">
         <div className="wrapper">
            <div className="form-box login">
                <form action="" className="form">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" name="email" placeholder="Email" id="email" />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" name="password" />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <div>
                            <input type="checkbox" id="remember-me-checkbox" />
                            <span>Remember me</span>
                        </div>
                        <a href="#">Forgot Password?</a>
                    </div>
                    
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="/registration">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
       </div>
    )
}
export default Login;