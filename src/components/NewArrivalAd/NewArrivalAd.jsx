import React, { useState, useEffect } from "react";
import "../../styles/NewArrivalAd.css";
import BASE_URL from '../../config';

const NewArrivalAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const hasSeenAd = localStorage.getItem("hasSeenAd");
    
    if (!hasSeenAd) {
      fetch(BASE_URL + "/user/get-new-arrival-video")
        .then((res) => res.json())
        .then((data) => {
          if (data.videoUrl) {
            setVideoUrl(data.videoUrl);
            setShowAd(true);
          }
        })
        .catch((error) => console.error("Error fetching video:", error));
    }
  }, []);

  const handleClose = () => {
    setShowAd(false);
    localStorage.setItem("hasSeenAd", "true");
  };

  return (
    showAd && videoUrl && (
      <div className="ad-container">
        <div className="ad-content">
          <button className="close-btn" onClick={handleClose}>X</button>
          <h2 className="ad-title">✨ New Arrival ✨</h2>
          <video autoPlay muted onEnded={handleClose} className="ad-video">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    )
  );
};

export default NewArrivalAd;
