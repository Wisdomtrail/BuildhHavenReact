import React, { useState, useEffect } from "react";
import Header from "../header/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../../styles/LandingPage.css';
import ContructionImg from '../../assets/img/ContructionImg.jpg';
import EngineerImg from '../../assets/img/EngineerImg.jpg';
import tallBuildingImg from '../../assets/img/tallBuilding.jpg';

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const images = [ContructionImg, EngineerImg, tallBuildingImg];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsFading(false);
            }, 1000); 
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsFading(false);
        }, 10); 
    }, []);

    return (
        <>
            <Header />
            <div className="LandingPage-container">
                <div className="banner">
                    <div className="image-container">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={`${
                                    index === 0
                                        ? "first"
                                        : "zoom-out"
                                } ${index === currentImageIndex ? "visible" : "hidden"} ${
                                    isFading ? "fade" : ""
                                }`}
                            />
                        ))}
                    </div>
                    <div className="dark-overlay">
                        <div className="banner-text">
                            <h1>We supply Quality <br />You Can Trust Everyday</h1>
                            <p>Building Dreams, One Quality Material at a Time. Discover The Difference With Build Haven Hubs's Premium <br />
                             Construction Supplies. Your Project Deserves The Best.</p>
                             <div>
                                <button className="learn-button">LEARN MORE 
                                            <FontAwesomeIcon className="arrow" icon={faArrowRight} /> </button>
                              <br /><br />  <button className="service-button">OUR SERVICES</button>

                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
