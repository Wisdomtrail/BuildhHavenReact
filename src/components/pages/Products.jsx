import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBell } from "react-icons/fa";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/products.css';
import { useNavigate } from "react-router-dom";
import logoP from '../../assets/img/logoP.png';
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../config";
const Products = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

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
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.message === "Products retrieved successfully" && data.products) {
          setProducts(data.products);
        } else {
          console.error("No products found or incorrect response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        const data = await response.json();    
        if (data.notifications && Array.isArray(data.notifications)) {
          const unreadNotifications = data.notifications.filter(
            (notification) => !notification.isRead // Assuming `isRead` indicates read status
          );
          setNotifications(unreadNotifications); // Assuming `setNotifications` is a state setter
        } else {
          console.error("No notifications found or incorrect response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };    

    fetchProducts();
    fetchNotifications();
  }, [navigate]);


  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("User ID or token is missing. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/user/getCartQuantity/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.totalQuantity !== undefined) {
          setCartCount(data.totalQuantity);
        } else {
          console.error("Failed to fetch cart quantity:", data);
        }
      } catch (error) {
        console.error("Error fetching cart quantity:", error);
      }
    };

    fetchCartCount();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (productId, action, maxQuantity, event) => {
    event.stopPropagation();

    setQuantities((prevQuantities) => {
      const newQuantity = { ...prevQuantities };
      const currentQuantity = newQuantity[productId] || 1;

      if (action === 'increase' && currentQuantity < maxQuantity) {
        newQuantity[productId] = currentQuantity + 1;
      }

      if (action === 'decrease' && currentQuantity > 1) {
        newQuantity[productId] = currentQuantity - 1;
      }

      return newQuantity;
    });
  };

  const handleAddToCart = async (product, event) => {
    event.stopPropagation();
    const quantity = quantities[product._id] || 1;

    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Assuming you have user ID stored in localStorage

        const response = await fetch(`${BASE_URL}/user/addToCart/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity,
          }),
        });

        const data = await response.json();
        if (data.message === "Product added to cart") {
          setCartCount((prevCount) => prevCount + quantity);
          toast.success("Added to Cart ✔️", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else {
          toast.error("Failed to add to cart", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    }
  };

  const viewProduct = (product) => {
    navigate(`/view-product/${product._id}`, { state: { product } });
  };

  const orders = () => {
    navigate('/cart');
  };
  const markAsRead = async () => {
    try {

      const userId = localStorage.getItem("userId");
      if (!userId || !token) {
        console.error("Admin ID or token is missing.");
        return;
      }
      const response = await fetch(`${BASE_URL}/user/${userId}/user-notifications/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        setNotifications([]);
      } else {
        console.error("Failed to mark notifications as read:", data.message);
        console.log("Backend message:", data.message); // Log the backend message
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };


  return (
    <>
      <Sidebar /><br /><br />
      <div className="products">
        <div className="topnav">
          <div className="logoP">
            <img src={logoP} alt="Logo" />
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="icons">

            <div
              className="notification-bell-wrapper"
              onClick={() => {
                if (showNotifications && notifications.length > 0) {
                  markAsRead();
                }
                toggleNotifications(); // Added parentheses to correctly call the function
              }}
            >

              <FaBell className="support-icon" />

              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}

              {showNotifications && (
                <div className="notifications-dropdownp">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <p key={index} className="notification-item">
                        {notification.message}
                      </p>
                    ))
                  ) : (
                    <p className="notification-item">No new notifications</p>
                  )}
                </div>
              )}

            </div>
            <div className="cart-icon-container" onClick={orders}>
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-item-count">{cartCount}</span>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.map((product) => {
          const productQuantity = quantities[product._id] || 1;
          return (
            <div className="product-card" key={product._id} onClick={() => viewProduct(product)}>
              <img src={product.images[0]} alt={product.name} />
              <p>{product.description.length > 40 ? `${product.description.substring(0, 40)}...` : product.description}</p>
              <div className="product-info">
                <div className="price-quantity">
                  <span className="product-price">₦{product.price}</span>
                  <div className="quantity-controls">
                    <button
                      onClick={(e) =>
                        handleQuantityChange(product._id, 'decrease', product.quantity, e)
                      }
                      disabled={productQuantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{productQuantity}</span>
                    <button
                      onClick={(e) =>
                        handleQuantityChange(product._id, 'increase', product.quantity, e)
                      }
                      disabled={productQuantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div><br /><br /><br /><br />
      <DMobileDownbar />

      <ToastContainer />
    </>
  );
};

export default Products;
