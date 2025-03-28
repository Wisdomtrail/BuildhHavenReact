import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import '../../styles/AboutUs.css'; 

import NewArrivalAd from '../NewArrivalAd/NewArrivalAd';

const AboutUs = () => {
    const navigate = useNavigate();

    const scrollToDetails = () => {
        const detailsSection = document.querySelector('.about-details');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="about-page-container">
            <Header />
            
            <NewArrivalAd/>
            <div className="about-banner">
                <div className="about-overlay">
                    <div className="aboutUsContent">
                        <h1>About Us</h1>
                        <p>
                            Learn more about our company, our values, and how we provide the best construction materials and tools to our customers.
                        </p><br />
                        <div className="button-container">
                            <button className="learn-more-button" onClick={scrollToDetails}>
                                Learn More <span className="arrow">→</span>
                            </button>
                            <button className="our-products-button" onClick={() => navigate('/precision-tools')}>
                                Our Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-details">
                <div className="our-mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to revolutionize the construction industry by providing top-notch materials, excellent customer service, and innovative solutions for builders and contractors.
                    </p>
                </div>
                <div className="our-values">
                    <h2>Our Values</h2>
                    <ul>
                        <li>✔ Quality and Reliability</li>
                        <li>✔ Customer Satisfaction</li>
                        <li>✔ Innovation and Excellence</li>
                        <li>✔ Integrity and Trust</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
