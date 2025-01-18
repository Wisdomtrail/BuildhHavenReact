import React, { useState, useEffect, useRef } from "react";
import Header from "../header/Header";
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../../styles/LandingPage.css';
import ContructionImg from '../../assets/img/ContructionImg.jpg';
import EngineerImg from '../../assets/img/EngineerImg.jpg';
import tallBuildingImg from '../../assets/img/tallBuilding.jpg';
import DandPlates from '../../assets/img/DandPlates.png'
import PSsteel from '../../assets/img/PSsteel.png';
import Ftools from '../../assets/img/Ftools.png';
import Bmaterials from '../../assets/img/Bmaterials.png';
import precisionTools from '../../assets/img/precisionTools.png';

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const images = [ContructionImg, EngineerImg, tallBuildingImg];
    const [activeSlide, setActiveSlide] = useState('f'); // 'f' means first slide active
    const handleSlideChange = (slide) => {
        setActiveSlide(slide);
        const container = document.querySelector('.compDesTextDiv');
        const slideWidth = container.offsetWidth;
        if (slide === 'f') {
            container.scrollLeft = 0; // Scroll to the first slide
        } else if (slide === 's') {
            container.scrollLeft = slideWidth; // Scroll to the second slide
        }
    };

    

    useEffect(() => {
        setCurrentImageIndex(0);
    }, []);

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
    const ourSDivsRef = useRef(null);
    const scrollToDiv = (index) => {
        if (ourSDivsRef.current) {
            const divs = ourSDivsRef.current.children;
            if (divs[index]) {
                ourSDivsRef.current.scrollTo({
                    left: divs[index].offsetLeft,
                    behavior: 'smooth'
                });
            }
        }

        // Toggle active class
        const controls = document.querySelectorAll('.controlBox');
        controls.forEach((control, i) => {
            control.classList.toggle('active', i === index);
        });
    };


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
                                className={`${index === 0 ? "first" : "zoom-out"} ${index === currentImageIndex ? "visible" : "hidden"} ${isFading ? "fade" : ""}`}
                            />
                        ))}
                    </div>
                    <div className="dark-overlay">
                        <div className="banner-text">
                            <h1>We supply Quality <br />You Can Trust Everyday</h1>
                            <p>Building Dreams, One Quality Material at a Time. Discover The Difference With Build Haven Hub's Premium <br />
                                Construction Supplies. Your Project Deserves The Best.</p>
                            <div>
                                <button className="learn-button">LEARN MORE
                                    <FontAwesomeIcon className="arrow" icon={faArrowRight} /> </button>
                                <br /><br />  <button className="service-button">OUR SERVICES</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="joinTeam">
                    <p>Join Our Team __ We are looking for talented & driven people to come work with us.</p>
                    <a href="">Contact Us</a>
                </div>
                <div className="compDes">
                    <div className="compDesText">
                        <h1>A Company To Change The <br /> World We're Steeler Industrial.</h1>
                        <span>In 2016, Build Haven Hub was founded with a vision to become a reliable supplier of high-quality
                            <br /> construction materials to private constructors. Starting from a small warehouse and a single supplier, the
                            <br /> company focused on building strong relationships with local builders, offering personalized service and
                            <br /> competitive pricing.</span><br /><br />
                        <span>At <span>BuildHaven Hub</span>, we believe in more than just supplying construction materials; we are architects of
                            <br /> dreams, partners in innovation, and champions of unwavering quality. Our story is one of passion,
                            <br /> dedication, and a commitment to redefine the construction landscape. Step into the world of
                            <br /> BuildHaven Hub, where every nail, every tool, and every interaction is infused with our core values.</span><br /><br /><br />
                        <button id="rmaua">READ MORE ABOUT US
                            <FontAwesomeIcon id="rmdarrow" className="arrow" icon={faArrowRight} /></button>
                    </div>
                    <div className="compDesTextDiv">
                        <div className="slidesContainer">
                            <div className={`firstSlide ${activeSlide === 'f' ? 'active' : 'inactive'}`}>
                                <p>OUR MISSION</p>
                                <span>
                                    BuildHaven Hub is on a mission to transform <br />
                                    <span>the construction experience. We are</span>  <br />
                                    <span> dedicated to providing not just products but  </span><br />
                                    <span>tools that instill confidence, materials that </span> <br />
                                    <span>embody quality, and a partnership that </span><br />
                                    <span>transcends the ordinary. Our mission is to be </span><br />
                                    <span> the catalyst for a new era in construction,</span><br />
                                    <span>standard.</span><br />
                                </span>
                            </div>
                            <div className={`secondSlide ${activeSlide === 's' ? 'active' : 'inactive'}`}>
                                <p>OUR VISION</p>
                                <span> We envision a world where every </span><br />
                                <span>construction endeavor, from the smallest</span><br />
                                <span>home improvement project to the grandest</span><br />
                                <span>architectural marvel, is fueled by</span><br />
                                <span> unparalleled quality and innovation. </span><br />
                                <span>BuildHaven Hub strives to be the heartbeat</span><br />
                                <span> of construction aspirations, ensuring that</span><br />
                                <span>dreams are not just built but built to last.</span>
                            </div>
                        </div>
                        <div id="sfSpan">
                            <span
                                className={`f ${activeSlide === 'f' ? 'active' : ''}`}
                                onClick={() => handleSlideChange('f')}
                            ></span>
                            <span
                                className={`s ${activeSlide === 's' ? 'active' : ''}`}
                                onClick={() => handleSlideChange('s')}
                            ></span>
                        </div>
                    </div>


                </div><br /><br /><br /><br /><br />
                <div className="sWeProvide">
                    <h1>Service We Provide</h1>
                    <span>We have diverse services for your construction project. We will procure top quality building materials for you and get them to you in good shape.</span><br /><br />
                    <div className="OurSDivs" ref={ourSDivsRef}>
                        <div className="sWePdiv">
                            <img src={precisionTools} alt="" />
                            <p>Precision Power Tools</p>
                            <div>
                                <span>Craft brilliance with our specialized fabrication tools. We provide the tools you need to shape metals with finesse. </span>
                                <br /><br /><br /><button>Read More  <FontAwesomeIcon id="sweArrow" className="arrow" icon={faArrowRight} /></button>
                            </div>
                        </div>
                        <div className="sWePdiv"><img src={Bmaterials} alt="" />
                            <p>Building Materials</p>
                            <div>
                                <span>
                                    Lay the foundation of excellence with our superior building materials. Explore a range that includes everything you need.</span>
                                <br /><br /><br /><button>Read More  <FontAwesomeIcon id="sweArrow" className="arrow" icon={faArrowRight} /></button>
                            </div>
                        </div>
                        <div className="sWePdiv"><img src={Ftools} alt="" />
                            <p>Fabrication Tools</p>
                            <div>
                                <span>
                                    Craft brilliance with our specialized fabrication tools. We provide the tools you need to shape metals with finesse.                                    </span>
                                <br /><br /><br /><button>Read More  <FontAwesomeIcon id="sweArrow" className="arrow" icon={faArrowRight} /></button>
                            </div>
                        </div>
                        <div className="sWePdiv"><img src={PSsteel} alt="" />
                            <p>Pipes and Structural Steel</p>
                            <div>
                                <span>
                                    BuildHaven Hub is your one-stop-shop for all types of pipes, including scaffolding pipes, H-beams, angles of all sizes and thicknesses.</span>
                                <br /><br /><br /><button>Read More  <FontAwesomeIcon id="sweArrow" className="arrow" icon={faArrowRight} /></button>
                            </div>

                        </div>
                        <div className="sWePdiv"><img src={DandPlates} alt="" />
                            <p>Doors And Plates</p>
                            <div>
                                <span>
                                    Design your spaces with our exquisite collection of doors and sheet plates of various thicknesses.</span>
                                <br /><br /><br /><button>Read More  <FontAwesomeIcon id="sweArrow" className="arrow" icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="slideControls">
                        <div id="controlBox" className="controlBox active" onClick={() => scrollToDiv(0)}></div>
                        <div id="controlBox" className="controlBox" onClick={() => scrollToDiv(1)}></div>
                    </div>
                    <br /><br /><br /><br />
                </div>

                <div className="aboutUs">
                    <p>About Us</p>
                    <h1>Customer Centric Approach</h1>
                    <span>At Build Haven Hub, our customers are at the heart of everything we do. We listen to their needs, understand their challenges, and strive to provide solutions that exceed their expectations. Our customer service team is always ready to assist, ensuring a seamless and positive experience from the first point of contact to the final delivery. We are not just suppliers; we are partners in our clients’ success.</span>
                    <button>Contact Us</button>
                </div>

                <div className="GitFaq"><br /><br />
                    <div className="gitF">
                        <form action="">
                            <h1>Get In Touch</h1>
                            <p>Fill all information details to consult with <br /> us to get sevices from us</p><br /><br />
                            <input type="text" name="" id="gitfI" placeholder="Your Name*" /><br /><br />
                            <input type="text" name="" id="gitfI" placeholder="Your Email*" /><br /><br />
                            <select name="" id="gitfl" >
                                <option value="">Inquiry 1</option>
                                <option value="">Inquiry 2</option>
                                <option value="">Inquiry 3</option>
                            </select><br /><br />
                            <div class="input-container">
                                <input type="text" id="gitfQ" placeholder=" " />
                                <label for="gitfQ">Your message*</label>
                            </div><br />

                            <button id="gitfl">Send Questions</button><br />
                        </form>
                    </div>
                    <div className="gitS">
                        <div className="gitSf">
                            <h1>FAQ</h1>
                            <p>If you have any questions please ask us and we will answer you as quickly as <br /> possible <span>Make a question now!</span>
                            </p>

                            <div className="gitScont">
                                <div >
                                    <div><p>What is the history of BuildHaven™?</p></div>
                                </div>
                                <section className="dfff">
                                    <span>
                                    In 2016, Build Haven Hub was founded with a vision to become a reliable supplier of high-quality construction materials to private constructors. Starting from a small warehouse and a single supplier, the company focused on building strong relationships with local builders, offering personalized service and competitive pricing.
                                    </span>
                                </section>
                                <div >
                                    <p>What's the process?</p>
                                </div>
                                <section className="dffs" id="dffs">
                                    <span>You just need to reach out via email, call or whatsapp. Once you do that, we'll take your order and process the delivery to you.</span>
                                </section>
                                <div><p>How is payment processed.</p></div>
                                <section className="dfft">
                                    <span>We are currently working on our purchase functionality, you'll soon be able to place order online.</span>
                                </section>
                            </div>
                        </div>
                    </div>
                </div><br /><br /><br />
                <Footer/>
            </div>
        </>
    );
};

export default LandingPage;
