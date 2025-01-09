import React, { useState, useEffect } from "react";
import Header from "../header/Header";

import '../../styles/LandingPage.css';
import ContructionImg from '../../assets/img/ContructionImg.jpg';
import EngineerImg from '../../assets/img/EngineerImg.jpg';
import tallBuildingImg from '../../assets/img/tallBuilding.jpg';

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image URLs for the banner
    const images = [
        ContructionImg,
        EngineerImg,
        tallBuildingImg,
    ];

    // Change the image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <div className="LandingPage-container">
                <div className="banner">
                    <div className="image-container">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Slide ${currentImageIndex + 1}`}
                        />
                    </div>
                    <div className="dark-overlay"></div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
