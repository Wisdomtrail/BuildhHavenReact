import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Sidebar from "../sideBar/SideBar";
import DMobileDownbar from "../sideBar/DMobileDownbar";
import { useNavigate } from "react-router-dom";
import "../../styles/logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <div className="logout-container">
        <div className="logout-card">
          <FaSignOutAlt className="logout-icon" />
          <h2 className="logout-title">Logging Out...</h2>
          <p className="logout-message">You are being logged out. Please wait...</p>
        </div>
      </div>
      <DMobileDownbar />
    </>
  );
};

export default Logout;
