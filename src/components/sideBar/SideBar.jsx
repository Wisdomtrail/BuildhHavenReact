import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaTag, FaList, FaCog, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/sidebar.css'; // Update to new CSS file name
import logo from '../../assets/img/logoT.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/products');
  };

  return (
    <div className="d-sidebar">
      <div className="d-sidebar-header">
        <h2>
          <img src={logo} alt="Logo" onClick={backToHome} />
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
      </nav>
    </div>
  );
};

export default Sidebar;
