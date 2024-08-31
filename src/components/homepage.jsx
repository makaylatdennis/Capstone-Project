import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function Homepage(){
    return (
        <section className="homepage-section">
            <div className="homepage-container">
                <div className="homepage-content">
                    <h1>Green Beginnings</h1>
                    <h2>Where new beginnings blossom</h2>
                    <h1>Elevate your home today - Let your outdoor dreams take root with us!</h1>
                    <button className="home-button">Get Started</button>
                </div>
                <div className="homepage-image">
                    <img src="/public/markus-spiske-4PG6wLlVag4-unsplash.jpg"/>
                </div>
            </div>
            <div className="svg-container">
                <svg className="curved-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#689c93" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                <svg className="curved-svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#689c93" fill-opacity="1" d="M0,320L120,314.7C240,309,480,299,720,288C960,277,1200,267,1320,261.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>    
            </div>
           
            <div className="home-community">
                <div id="community-img">
                    <img src="/public/markus-spiske-sFydXGrt5OA-unsplash.jpg"/>
                </div>

                <div className="community-text">
                    <h2 id="community-heading">Serving Our Community</h2>
                    <p>
                    At Green Beginnings, we believe that a beautiful and functional outdoor space can transform a house into a home. Our mission is to support first-time homebuyers by covering the costs of essential outdoor installations, including plants, gardening, outdoor furniture, kitchens, walkways, and more. Green Beginnings provides financial assistance and resources to help new homeowners create the outdoor spaces of their dreams. Whether it’s a lush garden, a cozy patio, or a practical outdoor kitchen, we are here to make it happen. Our services include:
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Homepage;