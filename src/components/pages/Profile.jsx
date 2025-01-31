import React from "react";
import Sidebar from "../sideBar/SideBar";
import DMobileDownbar from "../sideBar/DMobileDownbar";
import "../../styles/profile.css";
import image from "../../assets/img/Contruction.jpg";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const gotoSettings = () =>{
    navigate('/settings')
  }
  return (
    <>
      <Sidebar />
      <div className="ProfileContainer">
        <div className="ProfileCard">
          <img src={image} alt="User Profile" className="ProfileImage" />
          <h1>John Doe</h1>
          <p className="ProfileEmail">johndoe@gmail.com</p>
          <p className="ProfileBio">
            Loyal Customer | 50+ Orders Completed
          </p>
        </div>
        <div className="ProfileDetails">
          <h2>Order History</h2>
          <ul>
            <li>Order #12345 - Delivered</li>
            <li>Order #67890 - Processing</li>
            <li>Order #11223 - Cancelled</li>
          </ul>

          <h2>Wish List</h2>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>

          <h2>Account Settings</h2>
          <button onClick={gotoSettings}>Edit Profile</button>
          <button onClick={gotoSettings}>Change Password</button>
        </div>
      </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <DMobileDownbar />
    </>
  );
};

export default Profile;
