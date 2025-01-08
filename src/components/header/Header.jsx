import React from "react";
import '../../styles/Header.css';
import logo from '../../assets/img/Logo.png'
import phone from '../../assets/img/phoneIcon.png'
import messageIcon from '../../assets/img/messageIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Replace `faCoffee` with the icon you're using

const Header = () => {
    return(
        <div className="header-container">
            <div className="top-section">
                <div className="logoAndCallUsSection">
                    <img id="logo" src={logo} alt="" />
                    <div className="phoneCall">
                        <img id="phone" src={phone} alt="" />
                       <div className="contactN">
                        <span>Call Us 24/7</span><br />
                        <span>+234 816 538 5299</span>
                       </div>
                    </div>
                </div>
                <div className="contactEmailSection">
                    <img id="messageIcon" src={messageIcon} alt="" />
                    <div>
                        <span>Send Us Email</span><br />
                        <span>contact@buildhavenhub.com</span>
                    </div>
                </div>
                <div className="locationSection">
                <FontAwesomeIcon id="locationIcon" icon={ faLocationDot } style={{color: "#cd0084",}} />
                    <div>
                    <span>Send Us Email</span><br />
                    <span>contact@buildhavenhub.com</span>
                    </div>
                </div>


                
            </div>
            <div className="bottom-section">
                {/* Any content for the bottom section */}
            </div>
        </div>
    );
}

export default Header;
