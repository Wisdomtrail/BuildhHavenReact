import React, { useState, useEffect } from "react";
import Sidebar from "../sideBar/SideBar";
import DMobileDownbar from "../sideBar/DMobileDownbar";
import "../../styles/settings.css";
import BASE_URL from "../../config";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaEnvelope, FaLock, FaSpinner,  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize navigate
  
  const [profileImage, setProfileImage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
    if (!userId) {
      console.error("No userId found in localStorage.");
      return;
    }
  
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }
  
        const data = await response.json();
        const nameParts = data.fullName ? data.fullName.split(" ") : ["", ""];
  
        setFormData({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "", // Handles multiple last names
          email: data.email || "",
          password: "", // Keep password empty for security
        });
  
        setProfileImage(data.profileImage || "default-image-url.jpg");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [userId, navigate]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };
      setIsUpdated(Object.values(updatedData).some((val) => val !== ""));
      return updatedData;
    });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      setIsLoading(false);
      return;
    }
  
    // Extract only the fields that have been changed
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value.trim() !== "")
    );
  
    if (Object.keys(updatedFields).length === 0) {
      console.warn("No changes detected.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/user/updateInfo/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
  
      const responseData = await response.json(); // Read the response body
  
      if (response.ok) {
        setIsSuccess(true);
        setIsUpdated(false);
      } else {
        console.error("Failed to update user info:", responseData);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(false);
    }, 3000);
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setImageLoading(true);
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      setImageLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("profileImage", file);
  
    try {
      const response = await fetch(`${BASE_URL}/user/upload-profile-image/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token here
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setProfileImage(data.profileImage);
      } else {
        console.error("Failed to upload image:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  
    setImageLoading(false);
  };
  
  return (
    <>
      <Sidebar />
      <div className="settingsPage">
        <div className="settings">
          <h1>Profile Settings</h1>

          <div className="names">
            <div className="firstName">
              <p><FaUser className="icon" /> First Name</p>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="lastName">
              <p><FaUser className="icon" /> Last Name</p>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="emailPassword">
            <div className="email">
              <p><FaEnvelope className="icon" /> Email</p>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="password">
              <p><FaLock className="icon" /> Password</p>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <button className={`update-button ${isUpdated ? "active" : "inactive"}`} disabled={!isUpdated || isLoading} onClick={handleUpdate}>
            {isLoading ? <FaSpinner className="spinner" /> : "Update Info"}
          </button>

          {isLoading && <div className="loading-container"><FaSpinner className="spinner" /></div>}
          {isSuccess && <div className="success-message">✅ Success! Your information has been updated.</div>}
        </div>

        <div className="profile">
          <img src={profileImage} alt="Profile" className={`profile-image ${imageLoading ? "loading" : ""}`} />
          <h2>{formData.firstName} {formData.lastName}</h2>
          <p>{formData.email}</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} id="file-upload" style={{ display: "none" }} />
          <button onClick={() => document.getElementById("file-upload").click()}>
            {imageLoading ? <FaSpinner className="spinner" /> : "Upload Image"}
          </button>
        </div>
      </div>

      <DMobileDownbar /><br /><br /><br />
    </>
  );
};

export default Settings;
