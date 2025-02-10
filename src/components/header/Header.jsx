import React, { useState, useEffect, useRef  } from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight, faSearch, faBars, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/Logo.png';
import phoneIcon from '../../assets/img/phoneIcon.png';
import messageIcon from '../../assets/img/messageIcon.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const sidebarRef = useRef(null);
  
  const closeSidebar = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
      setSidebarOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);
    return () => document.removeEventListener("mousedown", closeSidebar);
  }, [isSidebarOpen]);
  

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleServices = () => setServicesOpen(!isServicesOpen);

  const navigateToLogin = () => {
    navigate('/login')
  }
  const bulidingPage = () =>{
    navigate('/building-materials');
  }
  const precisionPage = () => {
    navigate('/precision-tools')
  }

  return (
    <header>
      <div className="top-section">
        <div className="logoAndCallUsSection">
          <img id="logo" onClick={ () => navigate('/') } src={logo} alt="Build Haven Logo" />
          <div className="phoneCall">
            <img id="phone" src={phoneIcon} alt="Phone Icon" />
            <div className="contactN">
              <p id="tsh">Call Us 24/7</p>
              <p
                id="tsb"
                onClick={() => window.location.href = 'tel:+2348165385299'}
              >
                +234 816 538 5299
              </p>
            </div>
          </div>
        </div>
        <div className="nav-tools">
          <FontAwesomeIcon
            id="menuIcon"
            icon={faBars}
            color="#9e9e9e"
            onClick={toggleSidebar}
          />
        </div>
        <div className="contactEmailSection">
          <img src={messageIcon} alt="Message Icon" />
          <div>
            <p id="tsh">Send Us Mail</p>
            <p
              id="tsb"
              onClick={() => window.location.href = 'mailto:contact@buildhavenhub.com'}
            >
              contact@buildhavenhub.com
            </p>
          </div>
        </div>
        <div className="locationSection">
          <FontAwesomeIcon id="locationIcon" icon={faLocationDot} color="#CD0001" />
          <div>
            <p id="tsh">Our Location</p>
            <p
              id="tsb"
              onClick={() => window.open('https://www.google.com/maps/search/175,+Abeokuta+express+way+Iyana+Ipaja+Lagos', '_blank')}
            >
              175, Abeokuta express way Iyana Ipaja Lagos
            </p>
          </div>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <p className="hme"><a href="/">Home</a></p>
          <p id="aus"><a href="/aboutUs">About Us</a></p>
          <p className="services" onClick={toggleServices}>
            Services <FontAwesomeIcon icon={faAngleDown} />
            {isServicesOpen && (
              <div className="dropdown">
                <p id="building-materials" onClick={bulidingPage}><span>Building Materials</span></p>
                <p id="precision-power-tools" onClick={precisionPage}><span>Precision Power Tools</span></p>
                <p id="fabrication-tools" onClick={()=> navigate('/fabrication-tools')}><span>Fabrication Tools</span></p>
                <p id="pipes-steel" onClick={() => navigate('/pipes-steel')} ><span>Pipes and Structural Steel</span></p>
                <p id="accessories-gear" onClick={()=> navigate('/Accessories-SafetyGear')}><span>Accessories & Safety Gear</span></p>
                <p id="doors-plates" onClick={()=> navigate('/doors-plates')}><span>Doors and Plates</span></p>
                
              </div>
            )}
          </p>
          <p><a href="/news">News</a></p>
          <p><a href="/contactus">Contact Us</a></p>
          <p onClick={navigateToLogin}>Login</p>
        </nav>
      </div>

      <div className="bottom-section">
        <div>
          <p><a href="/">Home</a></p>
          <p><a href="aboutUs">About Us</a></p>
          <p className="services">
            Services <FontAwesomeIcon icon={faAngleDown} />
            <div className="dropdown">
              <p id="building-materials" onClick={bulidingPage}>Building Materials</p>
              <p id="precision-power-tools" onClick={precisionPage}>Precision Power Tools</p>
              <p id="fabrication-tools" onClick={()=> navigate('/fabrication-tools')}>Fabrication Tools</p>
              <p id="pipes-steel" onClick={() => navigate('/pipes-steel')}>Pipes and Structural Steel</p>
              <p id="accessories-gear"onClick={()=> navigate('/Accessories-SafetyGear')}>Accessories & Safety Gear</p>
              <p id="doors-plates"onClick={()=> navigate('/doors-plates')}>Doors and Plates</p>
            </div>
          </p>

          <p><a href="/news">News</a></p>
          <p><a href="contactUs">Contact Us</a></p>
          <p onClick={navigateToLogin}>Login</p>
        </div>
        <div className="sg">
          <input type="text" name="slideOutOnclick" id="searchBox" />
          <FontAwesomeIcon id="searchIcon" icon={faSearch} />
          <button className="quote-button">
            Get a Quote
            <FontAwesomeIcon className="arrow" icon={faArrowRight} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
