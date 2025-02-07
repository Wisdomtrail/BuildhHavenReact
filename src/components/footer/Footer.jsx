import React from "react"
import '../../styles/Footer.css'
import logo from '../../assets/img/logoT.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faGlobe, faLocation, faLocationDot, faMessage, faPhone, faSquare } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {



    return (
        <div className="footerContainer" id="footerS">
            
            <div className="infoFooter"><br /><br /><br />
                <img src={logo} alt="" />
                <section>
                    Our unwavering commitment to excellence is evident in our thoughtfully curated categories, designed to meet every dimension of your construction needs.
                </section>
            </div>
            <div className="contactFooter">
                <h2>Contact Company</h2>

                <section>
                    <a href="tel:+2348165385299">
                        <FontAwesomeIcon className="fa-icon" icon={faPhone} />
                        <span>+234 816 538 5299</span>
                    </a>
                </section>
                <br />

                <section className="emFooter">
                    <FontAwesomeIcon className="fa-icon" id="mfoot" icon={faEnvelope} />
                    <article>
                        <a href="mailto:contact@buildhavenhub.com">
                            <span>contact@buildhavenhub.com</span>
                        </a>
                        <br />
                        <a href="mailto:support@buildhavenhub.com">
                            <span>support@buildhavenhub.com</span>
                        </a>
                    </article>
                </section>
                <br />

                <section>
                    <a
                        href="https://www.google.com/maps?q=175+Abeokuta+express+way+Iyana+Ipaja+Lagos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon className="fa-icon" icon={faLocationDot} />
                        <span>
                        <span>175, Abeokuta express way </span>
                        <br />
                        <span id="iil">Iyana Ipaja Lagos</span>
                        </span>
                    </a>
                </section>
                <br />

                <section>
                    <a
                        href="https://www.buildhavenhub.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon className="fa-icon" icon={faGlobe} />
                        <span id="www">www.buildhavenhub.com</span>
                    </a>
                </section>
            </div>

            <div className="quick-links">
                <h2>Quick Links</h2>
                <section>
                    <FontAwesomeIcon className="quick-icons" icon={faSquare}/>
                    <a href="/">Home</a>
                </section><br />
                <section>
                    <FontAwesomeIcon className="quick-icons" icon={faSquare}/>
                    <a  href="/aboutUs">Who Are We</a>
                </section><br />
                <section>
                    <FontAwesomeIcon className="quick-icons" icon={faSquare}/>
                    <a  href="/news">News</a>
                </section><br />
                <section>
                    <FontAwesomeIcon className="quick-icons" icon={faSquare}/>
                    <a>Our Services</a>
                </section><br />
                <section>
                    <FontAwesomeIcon className="quick-icons" icon={faSquare}/>
                    <a  href="/contactUs">Contact Us</a>
                </section>
            </div>

            <div className="newsLetter">
                <h2>Newsletter</h2>
                <section>
                    <span>
                    Subscribe to our Newsletter & Event 
                    </span><br />
                    <span>right now to be updated.</span>
                </section>
                <br />
                <section>
                   <div id="sendMail">
                   <input type="text" placeholder="Email" /><br />
                   <button>Send</button>
                   </div>
                    <br /><br />
                    <span>Want to visit?</span>
                    <span><a href="">Click here</a></span>
                </section>
            </div>
<br /><br /><br /><br /><br />
        </div>
    )
}
export default Footer