import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaList, FaCog, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/sidebar.css';
import logo from '../../assets/img/logoT.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchCartQuantity = useCallback(async () => {
    if (!userId || !token) return;

    try {
      const response = await fetch(`http://localhost:3001/user/getCartQuantity/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCartQuantity(data.totalQuantity || 0);
      } else {
        console.error("Failed to fetch cart quantity:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart quantity:", error);
    }
  }, [userId, token]); // Dependency array ensures it updates if `userId` or `token` changes

  useEffect(() => {
    fetchCartQuantity();
  }, [fetchCartQuantity]); // Now it has no warning because `fetchCartQuantity` is stable

  return (
    <div className="d-sidebar">
      <div className="d-sidebar-header">
        <h2>
          <img src={logo} alt="Logo" onClick={() => navigate('/products')} />
        </h2>
      </div>
      <nav className="d-sidebar-nav">
        <ul>
          <li>
            <Link to="/products" className={currentPath === '/products' ? 'active' : ''}>
              <FaBox className="d-sidebar-icon" />
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className={currentPath === '/cart' ? 'active' : ''}>
              <FaShoppingCart className="d-sidebar-icon" />
              Cart {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </Link>
          </li>
          <li>
            <Link to="/orders" className={currentPath === '/orders' ? 'active' : ''}>
              <FaList className="d-sidebar-icon" />
              Orders
            </Link>
          </li>
          <li>
            <Link to="/settings" className={currentPath === '/settings' ? 'active' : ''}>
              <FaCog className="d-sidebar-icon" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="/profile" className={currentPath === '/profile' ? 'active' : ''}>
              <FaUser className="d-sidebar-icon" />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/logout" className={currentPath === '/logout' ? 'active' : ''}>
              <FaSignOutAlt className="d-sidebar-icon" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
