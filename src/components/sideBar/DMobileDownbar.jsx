import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaTag, FaList, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/d-mobile-downbar.css'; // Make sure to link to the new CSS file

const DMobileDownbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
          <Link to="/coupons" className={currentPath === '/coupons' ? 'active' : ''}>
            <FaTag className="d-sidebar-icon" />
            Coupons
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
