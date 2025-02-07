import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaList, FaCog, FaUser, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import '../../styles/d-mobile-downbar.css';
import BASE_URL from '../../config';

const DMobileDownbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchCartQuantity = async () => {
      if (!userId || !token) return;

      try {
        const response = await fetch(`${BASE_URL}/user/getCart/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.cart) {
          const totalQuantity = data.cart.reduce((acc, item) => acc + item.quantity, 0);
          setCartQuantity(totalQuantity);
        }
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    };

    fetchCartQuantity();
  }, [userId, token]);

  return (
    <div className="d-mobile-downbar">
      <ul>
        <li>
          <Link to="/products" className={currentPath === '/products' ? 'active' : ''}>
            <FaBox className="d-sidebar-icon" />
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className={currentPath === '/cart' ? 'active' : ''}>
            <div className="cart-icon-container">
              <FaShoppingCart className="d-sidebar-icon" />
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </div>
            Cart
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
    </div>
  );
};

export default DMobileDownbar;
