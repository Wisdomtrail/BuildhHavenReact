import React from 'react';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import '../../styles/ContactUs.css'; // Import the custom CSS file

const ContactUs = () => {
    return (
        <div className="contact-us">
            <Header />
            <div className="hero-section">
                <div className="overlay">
                    <div className="content">
                        <h1 className="title">Contact Us</h1>
                        <p className="subtitle">
                            We're here to assist you with all your construction material and tool needs. Reach out to us through any
                            <br /> of the methods below, and our team will respond promptly.
                        </p>
                        <div className="buttons">
                            <button className="get-in-touch-button">
                                Get in Touch <span className="arrow">→</span>
                            </button>
                            <button className="request-quote-button">
                                Request a Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="message-form">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form">
    <input type="text" placeholder="Your Name" required className="contact-input" />
    <input type="email" placeholder="Your Email" required className="contact-input" />
    <textarea placeholder="Your Message" required className="contact-textarea"></textarea>
    <button type="submit" className="contact-submit-btn">Submit</button>
</form>

                </div>
                <div className="details">
                    <h2>Our Contact Information</h2>
                    <p><strong>Address:</strong> 175, Abeokuta express way Iyana Ipaja Lagos</p>
                    <p><strong>Phone:</strong> +234 816 538 5299</p>
                    <p><strong>Email:</strong> contact@buildhavenhub.com</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
