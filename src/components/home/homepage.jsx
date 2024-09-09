import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="homepage-section">
            <div className="homepage-container">
                <div className="homepage-content">
                    <h1>GREEN BEGINNINGS</h1>
                    <h2 className="blossom">Where new beginnings blossom</h2>
                    <h2 className="elevate">Elevate your home today - Let your outdoor dreams take root with us!</h2>
                    <button className="home-button"><Link to="/application" className="applynow-no-visited">Get Started</Link></button>
                </div>
                <div className="homepage-image">
                    <img src="/markus-spiske-4PG6wLlVag4-unsplash.jpg" alt="Green Beginnings"/>
                </div>
            </div>
            <div className="svg-container">
                <svg className="curved-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#689c93" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L0,320Z"></path>
                </svg>
                <svg className="curved-svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#689c93" fill-opacity="1" d="M0,320L80,304C160,288,320,256,480,256C640,256,800,288,960,293.3C1120,299,1280,277,1360,266.7L1440,256L1440,0L0,0Z"></path>
                </svg>
            </div>

            <div className="home-community">
                <div id="community-img">
                    <img src="/markus-spiske-sFydXGrt5OA-unsplash.jpg" alt="Community"/>
                </div>

                <div className="community-text">
                    <h1 id="community-heading">SERVING OUR COMMUNITY</h1>
                    <p>At Green Beginnings, we understand that a well-designed outdoor space can turn a house into a true home. Our mission is to assist first-time homebuyers by funding essential outdoor installations, including plants, gardens, outdoor furniture, kitchens, and walkways. We aim to provide the financial support and resources needed to help new homeowners create their ideal outdoor environments. Whether it’s a vibrant garden, a comfortable patio, or a functional outdoor kitchen, we are dedicated to making these dreams a reality.</p>
                    <p>In addition to financial assistance, Green Beginnings offers volunteer opportunities for community members to help with installations. This fosters a sense of community and support for new homeowners. Our goal is to ensure that every first-time homebuyer can enjoy a welcoming and beautiful outdoor space. By bringing people together, we create lasting connections and enhance the overall homeownership experience. Join us in transforming houses into homes with Green Beginnings.</p>
                </div>
            </div>

            <div className="services-section">
                <h1>Our Services</h1>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(0)}>
                        <h2>Planting and Gardening</h2>
                        <span>{activeIndex === 0 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 0 && (
                        <div className="accordion-content">
                            <p>From selecting the right plants to designing a sustainable garden, we offer expert advice and financial support. Our team of horticulturists will guide you through every step, ensuring your garden thrives in its environment. We also provide seasonal maintenance tips and workshops to help you become a gardening pro.</p>
                        </div>
                    )}
                </div>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(1)}>
                        <h2>Outdoor Furniture</h2>
                        <span>{activeIndex === 1 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 1 && (
                        <div className="accordion-content">
                            <p>We help you choose and install outdoor furniture that fits your style and needs. Whether you're looking for a cozy patio set, a durable dining table, or stylish loungers, we have a wide range of options. Our experts will assist you in selecting materials that withstand the elements and complement your outdoor aesthetic.</p>
                        </div>
                    )}
                </div>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(2)}>
                        <h2>Outdoor Kitchens</h2>
                        <span>{activeIndex === 2 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 2 && (
                        <div className="accordion-content">
                            <p>Transform your backyard into a culinary haven with our assistance in setting up outdoor kitchens. From selecting the right appliances to designing the layout, we ensure your outdoor kitchen is both functional and beautiful. Enjoy cooking and entertaining outdoors with our custom solutions tailored to your space and preferences.</p>
                        </div>
                    )}
                </div>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(3)}>
                        <h2>Walkways and Pathways</h2>
                        <span>{activeIndex === 3 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 3 && (
                        <div className="accordion-content">
                            <p>Enhance the accessibility and aesthetics of your outdoor space with professionally designed walkways. Our landscape architects will create pathways that blend seamlessly with your garden, using materials like stone, brick, or gravel. We focus on both form and function, ensuring safe and attractive routes throughout your property.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="get-involved-section">
                <h1>Get Involved</h1>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(4)}>
                        <h2>Volunteer</h2>
                        <span>{activeIndex === 4 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 4 && (
                        <div className="accordion-content">
                            <p>Join our team of dedicated volunteers who assist with installations and share their expertise with new homeowners. Volunteering with us is a great way to learn new skills, meet like-minded individuals, and contribute to creating beautiful outdoor spaces in our community.</p>
                        </div>
                    )}
                </div>
                <div className="accordion-item">
                    <div className="accordion-title" onClick={() => toggleAccordion(5)}>
                        <h2>Request Assistance</h2>
                        <span>{activeIndex === 5 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 5 && (
                        <div className="accordion-content">
                            <p>If you're a first-time homebuyer in need of help with your outdoor space, sign up to receive our support. We offer personalized consultations and hands-on assistance to help you create a garden or outdoor area that you can be proud of. Our goal is to make sustainable and beautiful outdoor living accessible to everyone.</p>
                        </div>
                    )}
                </div>
            </div>

            <h1 className="team-title">Meet The Team</h1>

            <div className="carousel-container">
                <div className="carousel-track">
                    <div className="carousel-item">
                        <img src="/me.jpeg" alt="Makayla Dennis" className="team-image" />
                        <h3 className="team-name">Makayla Dennis</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Sera Senwosret-Ward Headshot (1) 2.png" alt="Sera Ward" className="team-image" />
                        <h3 className="team-name">Sera Ward</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Josh Drakeford Headshot.JPG" alt="Josh Drakeford" className="team-image" />
                        <h3 className="team-name">Josh Drakeford</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Jorge Esparza Headshot.JPG" alt="Jorge Axel Esparza" className="team-image" />
                        <h3 className="team-name">Jorge Axel Esparza</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/me.jpeg" alt="Makayla Dennis" className="team-image" />
                        <h3 className="team-name">Makayla Dennis</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Sera Senwosret-Ward Headshot (1) 2.png" alt="Sera Ward" className="team-image" />
                        <h3 className="team-name">Sera Ward</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Josh Drakeford Headshot.JPG" alt="Josh Drakeford" className="team-image" />
                        <h3 className="team-name">Josh Drakeford</h3>
                    </div>
                    <div className="carousel-item">
                        <img src="/Jorge Esparza Headshot.JPG" alt="Jorge Axel Esparza" className="team-image" />
                        <h3 className="team-name">Jorge Axel Esparza</h3>
                    </div>
                </div>
            </div>


            <div className="contact-section">
                <h1>Contact Us</h1>
                <p>We’d love to connect with you! If you have questions about our services, need assistance with your outdoor projects, or simply want to learn more about what we do, feel free to reach out. Our team is here to provide the support and information you need. Don’t hesitate to contact us for any inquiries or to share your feedback.</p>
                <div className="contact-info">
                    <p><strong>Email:</strong> support@greenbeginnings.com</p>
                    <p><strong>Phone:</strong> (704) 123-4567</p>
                </div>
            </div>
        </section>
    );
}

export default Homepage;










