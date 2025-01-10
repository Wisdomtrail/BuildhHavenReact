import React, { useEffect } from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/Logo.png';
import phoneIcon from '../../assets/img/phoneIcon.png';
import messageIcon from '../../assets/img/messageIcon.png';

const Header = () => {
  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 5;
    const topSection = document.querySelector('.top-section');
    const bottomSection = document.querySelector('.bottom-section');
    const header = document.querySelector('header');

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (Math.abs(scrollTop - lastScrollTop) <= delta) return;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        topSection.classList.add('hidden');
        bottomSection.classList.add('hidden');
      } else {
        // Scrolling up
        topSection.classList.remove('hidden');
        bottomSection.classList.remove('hidden');
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              <p id="tsh">Call Us 24/7</p>
              <p id="tsb">+234 816 538 5299</p>
            </div>
          </div>
        </div>
        <div className="nav-tools">
          <FontAwesomeIcon icon={faSearch} color="#9e9e9e" />
          <FontAwesomeIcon id="menuIcon" icon={faBars} color="#9e9e9e" />
        </div>
        {/* Email Section */}
        <div className="contactEmailSection">
          <img src={messageIcon} alt="Message Icon" />
          <div>
            <p id="tsh" >Send Us Mail</p>
            <p id="tsb">contact@buildhavenhub.com</p>
          </div>
        </div>
        {/* Location Section */}
        <div className="locationSection">
          <FontAwesomeIcon id="locationIcon" icon={faLocationDot} color="#CD0001" />
          <div>
            <p id="tsh">Our Location</p>
            <p id="tsb">175, Abeokuta express way Iyana Ipaja Lagos</p>
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
