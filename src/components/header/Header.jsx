import React from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import  logo from '../../assets/img/Logo.png';
import phoneIcon from '../../assets/img/phoneIcon.png'
import messageIcon from '../../assets/img/messageIcon.png'
const Header = () => {
  return (
    <header>
      {/* Top Section */}
      <div className="top-section">
        {/* Logo and Call Us Section */}
        <div className="logoAndCallUsSection">
          <img id="logo" src={logo} alt="Build Haven Logo" />
          <div className="phoneCall">
            <img id="phone" src={phoneIcon} alt="Phone Icon" />
            <div className="contactN">
              <p>Call Us 24/7</p>
              <p>+234 816 538 5299</p>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="contactEmailSection">
            <img src={messageIcon} alt="" />
          <div>
            <p>Send Us Mail</p>
            <p>contact@buildhavenhub.com</p>
          </div>
        </div>

        {/* Location Section */}
        <div className="locationSection">
          <FontAwesomeIcon id="locationIcon" icon={faLocationDot} color="#CD0001" />
          <div>
            <p>Our Location</p>
            <p>175, Abeokuta express way Iyana Ipaja Lagos</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div>
          <p>Home</p>
          <p>About Us</p>
          <p>Services</p>
          <p>News</p>
          <p>Contact Us</p>
        </div>
        <div className="sg">
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
