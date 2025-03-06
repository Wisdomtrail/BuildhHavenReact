import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import NewArrivalAd from '../NewArrivalAd/NewArrivalAd';
import '../../styles/ContactUs.css'; // Import the custom CSS file

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSending, setIsSending] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setModalMessage("Please fill out all fields before submitting.");
            setModalOpen(true);
            return;
        }

        setIsSending(true);

        emailjs
            .send(
                "service_945fzok", // Your EmailJS Service ID
                "template_mre49re", // Your EmailJS Template ID
                formData,
                "zXCA7yc7A9WFsuPbS" // Your EmailJS Public Key
            )
            .then(() => {
                setModalMessage("Message sent successfully! We will get back to you soon.");
                setModalOpen(true);
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                console.error("FAILED...", error);
                setModalMessage("Something went wrong. Please try again later.");
                setModalOpen(true);
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <div className="contact-us">
            <Header />
            
            <NewArrivalAd/>
            <div className="hero-sectionc">
                <div className="overlay">
                    <div className="content">
                        <h1 className="title">Contact Us</h1>
                        <p className="subtitle">
                            We're here to assist you with all your construction material and tool needs. Reach out to us through any
                            <br /> of the methods below, and our team will respond promptly.
                        </p>
                        <div className="buttons">
                            <button
                                className="get-in-touch-button"
                                onClick={() => window.open("https://wa.me/2348165385299", "_blank")}
                            >
                                Get in Touch <span className="arrow">→</span>
                            </button>

                            <button
                                className="request-quote-button"
                                onClick={() => window.open("https://wa.me/2348165385299", "_blank")}
                            >
                                Request a Quote
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-info">
                <div className="message-form">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="contact-input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="contact-input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            className="contact-textarea"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <button type="submit" className="contact-submit-btn" disabled={isSending}>
                            {isSending ? "Sending..." : "Submit"}
                        </button>
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

            {/* Modal for Success/Error Messages */}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Notification</h2>
                        <p>{modalMessage}</p>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="modal-close-btn"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;
