import React from 'react';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import '../../styles/News.css'; // Separate CSS for News Page

const News = () => {
    return (
        <div className="news-page-container">
            <Header />

            <div className="news-banner">
                <div className="news-overlay">
                    <div className="newsContent">
                        <h1>Latest News & Updates</h1>
                        <p>
                            Stay up to date with our latest news, updates, and trends in the construction industry.
                        </p>
                    </div>
                </div>
            </div>
            <div className="news-section">
                <div className="news-card">
                    <h2>🛠️ Latest Construction Innovations in 2025</h2>
                    <p>
                        Stay updated on cutting-edge construction technologies and techniques transforming the industry.
                    </p>
                    <a href="https://www.constructiondive.com/topic/technology/"
                        className="read-more-button"
                        target="_blank"
                        rel="noopener noreferrer">
                        Read More →
                    </a>
                </div>

                <div className="news-card">
                    <h2>🏗️ Smart Building Materials: The Future of Construction</h2>
                    <p>
                        Discover how smart materials are improving efficiency, durability, and cost-effectiveness in construction.
                    </p>
                    <a href="https://www.archdaily.com/tag/smart-materials"
                        className="read-more-button"
                        target="_blank"
                        rel="noopener noreferrer">
                        Read More →
                    </a>
                </div>

                <div className="news-card">
                    <h2>🌍 Sustainable Building: Eco-Friendly Construction Trends</h2>
                    <p>
                        Learn about the latest eco-friendly materials and sustainable building techniques shaping the industry.
                    </p>
                    <a href="https://www.archdaily.com/tag/sustainable-materials"
                        className="read-more-button"
                        target="_blank"
                        rel="noopener noreferrer">
                        Read More →
                    </a>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default News;
