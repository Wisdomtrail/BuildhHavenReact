import React, { useState } from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight, faSearch, faBars, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/Logo.png';
import phoneIcon from '../../assets/img/phoneIcon.png';
import messageIcon from '../../assets/img/messageIcon.png';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleServices = () => setServicesOpen(!isServicesOpen);

  return (
    <header>
      {/* Top Section */}
      <div className="top-section">
        <div className="logoAndCallUsSection">
          <img id="logo" src={logo} alt="Build Haven Logo" />
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
        {/* Email Section */}
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
        {/* Location Section */}
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

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <p className="hme">Home</p>
          <p id="aus">About Us</p>
          <p className="services" onClick={toggleServices}>
            Services <FontAwesomeIcon icon={faAngleDown} />
            {isServicesOpen && (
              <div className="dropdown">
                <p id="building-materials"><span>Building Materials</span></p>
                <p id="precision-power-tools"><span>Precision Power Tools</span></p>
                <p id="fabrication-tools"><span>Fabrication Tools</span></p>
                <p id="pipes-steel"><span>Pipes and Structural Steel</span></p>
                <p id="accessories-gear"><span>Accessories & Safety Gear</span></p>
                <p id="doors-plates"><span>Doors and Plates</span></p>
              </div>
            )}
          </p>
          <p>News</p>
          <p>Contact Us</p>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div>
          <p>Home</p>
          <p>About Us</p>
          <p className="services">
            Services <FontAwesomeIcon icon={faAngleDown} />
            <div className="dropdown">
              <p id="building-materials">Building Materials</p>
              <p id="precision-power-tools">Precision Power Tools</p>
              <p id="fabrication-tools">Fabrication Tools</p>
              <p id="pipes-steel">Pipes and Structural Steel</p>
              <p id="accessories-gear">Accessories & Safety Gear</p>
              <p id="doors-plates">Doors and Plates</p>
            </div>
          </p>

          <p>News</p>
          <p>Contact Us</p>
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
