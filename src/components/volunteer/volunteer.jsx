import React from 'react';
import './volunteer.css';
import Volform from './volform'

function Volunteer(){
    return (
        <section className="volunteer-section">


            <div className="volunteer-container">
                <div className="volunteer-content">
                    <h3>Cultivate Community, One Garden at a Time!</h3>
                    <h1> Your skills can help new homeowners create their dream garden. </h1>
                    <p>Join our volunteer team to transform outdoor spaces and give first-time homeowners the beautiful, welcoming environment they deserve.</p>
                    <button className="vol-button">Lend a Hand</button>
                </div>
                <div className="volunteer-image">
                    <img src="/vol-hero.png" alt="volunteering clipart" />
                </div>
            </div>
            <div className="svg-container">
                <svg className="curved-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#689c93" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                <svg className="curved-svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#689c93" fill-opacity="1" d="M0,320L120,314.7C240,309,480,299,720,288C960,277,1200,267,1320,261.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>    
            </div>
           
            <div className="vol-testimony">
<div id="testimony-img">
                <img src="/vol-image.png" id="testimony-img" alt="volunteer image" />
            </div>

            <div className="testimony-text">
                <h2 id="testimony-heading">Volunteer Stories: Emily Johnson & Mark Davis</h2>
                <p>
                For the past three years, Emily Johnson and Mark Davis have been volunteering with Green Beginnings, transforming local neighborhoods through their passion for landscaping. Their efforts have not only helped countless first-time homeowners but also helped build a stronger community. Emily and Mark's commitment to making a difference is a shining example of how volunteering can have a lasting impact on a community.
                </p>
            </div>

        </div>

        <Volform />

        </section>
    );
}

export default Volunteer;
