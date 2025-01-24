import React, { useState } from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/settings.css'; // Ensure to import the CSS

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };
      setIsUpdated(
        Object.values(updatedData).some((val) => val !== "")
      );
      return updatedData;
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image data URL to state
      };
      reader.readAsDataURL(file); // Read the file and convert it to a data URL
    }
  };

  // Handle form update
  const handleUpdate = () => {
    setIsLoading(true);  // Show the loading spinner

    setTimeout(() => {
      setIsLoading(false);  // Hide the spinner after 3 seconds
      setIsSuccess(true);    // Show success message
      setIsUpdated(false);   // Disable the update button
    }, 3000);  // Simulate 3 seconds loading time
  };

  return (
    <>
      <Sidebar />
      <div className="settingsPage">
        <div className="settings">
          <h1>Profile Settings</h1>
          <div className="names">
            <div className="firstName">
              <p>First Name</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="LastName">
              <p>Last Name</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="emailPassword">
            <div className="email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className={`update-button ${isUpdated ? "active" : "inactive"}`}
            disabled={!isUpdated || isLoading}
            onClick={handleUpdate}
          >
            {isLoading ? "Updating..." : "Update Info"}
          </button>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && !isLoading && (
            <div className="success-message">
              <span className="checkmark">✔️</span>
              <p>Success! Your information has been updated.</p>
            </div>
          )}
        </div>
        <div className="profile">
          <img
            src={profileImage || "default-image-url.jpg"} // Use default image if no image is selected
            alt="Profile"
          />
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.email}</p>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }} // Hide the input element
            id="file-upload"
          />
          <button onClick={() => document.getElementById('file-upload').click()}>Upload Image</button>
        </div>
      </div><br /><br /><br /><br />
      <DMobileDownbar />
    </>
  );
};

export default Settings;
