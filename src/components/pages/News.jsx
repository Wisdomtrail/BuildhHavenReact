import React from 'react';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import '../../styles/News.css'; // Separate CSS for News Page

const News = () => {
    return (
        <div className="news-page-container">
            <Header />
            
            {/* Hero Section */}
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

            {/* News Section */}
            <div className="news-section">
                <div className="news-card">
                    <h2>🚧 New Construction Trends for 2025</h2>
                    <p>
                        Discover the latest innovations and technologies shaping the future of construction.
                    </p>
                    <button className="read-more-button">Read More →</button>
                </div>

                <div className="news-card">
                    <h2>🏗️ BuildHaven Expands to More Cities</h2>
                    <p>
                        We are excited to announce our expansion to more cities, making construction materials more accessible.
                    </p>
                    <button className="read-more-button">Read More →</button>
                </div>

                <div className="news-card">
                    <h2>💡 Sustainable Building Materials Now Available</h2>
                    <p>
                        Learn about our new eco-friendly materials that are revolutionizing the construction industry.
                    </p>
                    <button className="read-more-button">Read More →</button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default News;
