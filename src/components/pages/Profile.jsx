import React, { useEffect, useState } from "react";
import Sidebar from "../sideBar/SideBar";
import { jwtDecode } from "jwt-decode";
import DMobileDownbar from "../sideBar/DMobileDownbar";
import "../../styles/profile.css";
import { useNavigate } from "react-router-dom";
import {
  FaEdit, FaLock, FaBoxOpen, FaHeart, FaCheckCircle, FaTimesCircle,
  FaHourglassHalf
} from "react-icons/fa";
import BASE_URL from "../../config";
import defaultImage from '../../assets/img/defaultImage.jpg';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
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
        setError("Please Log in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data (Status: ${response.status})`);
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format received from server.");
        }
        if (!data.fullName || !data.email) {
          throw new Error("User profile data is incomplete.");
        }

        setUserData({
          ...data,
          wishlist: data.wishlist || [], // Ensure wishlist exists
          orders: data.orders || [],    // Ensure orders exist
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const gotoSettings = () => {
    navigate("/settings");
  };

  if (loading) {
    return <div className="loading">Loading Profile...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const completedOrders = userData.orders.filter(order => order.status === "Completed");

  return (
    <>
      <Sidebar />
      <div className="ProfileContainer">
        <div className="ProfileCard">
          <img
            src={userData.profileImage || defaultImage}
            alt="User Profile"
            className="ProfileImage"
          />
          <h1 className="ProfileName">{userData.fullName}</h1>
          <p className="ProfileEmail">{userData.email}</p>
          <p className="ProfileBio">
            Loyal Customer | {completedOrders.length} Orders Completed
          </p>
        </div>

        <div className="ProfileDetails">
          <h2><FaBoxOpen /> Order History</h2>
          <ul className="OrderHistory">
            {userData.orders.length > 0 ? (
              userData.orders.map((order, index) => (
                <li key={index} className="OrderItem">
                  {order.status === "Completed" ? (
                    <>
                      <FaCheckCircle className="order-icon delivered" />
                      <span>Order #{order.orderId} - Completed</span>
                    </>
                  ) : order.status === "Pending" ? (
                    <>
                      <FaHourglassHalf className="order-icon processing" />
                      <span>Order #{order.orderId} - Pending</span>
                    </>
                  ) : order.status === "Cancelled" ? (
                    <>
                      <FaTimesCircle className="order-icon canceled" />
                      <span>Order #{order.orderId} - Cancelled</span>
                    </>
                  ) : null}
                </li>
              ))
            ) : (
              <li>No orders yet.</li>
            )}
          </ul>

          <h2><FaHeart /> Wish List</h2>
          <ul className="WishList">
            {userData.wishlist.length > 0 ? (
              userData.wishlist.map((product, index) => (
                <li key={index} className="WishlistItem">{product}</li>
              ))
            ) : (
              <li>No items in wishlist.</li>
            )}
          </ul>

          <h2><FaEdit /> Account Settings</h2>
          <button className="EditProfileButton" onClick={gotoSettings}>
            <FaEdit /> Edit Profile
          </button><br />
          <button className="ChangePasswordButton" onClick={gotoSettings}>
            <FaLock /> Change Password
          </button>
        </div>
      </div>
      <DMobileDownbar />
      <br /><br /><br /><br />
    </>
  );
};

export default Profile;
