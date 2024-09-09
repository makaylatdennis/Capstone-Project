import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faWandMagicSparkles, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import './application.css';
import ServiceInquiryForm from './serviceInquiry';
function Application() {
  return (
    <div className='service-app'>
      <div id="firsthalf">
        <div id='app-logo'>
        </div>
        <h1 id='service-heading'>What We're Doing at Green Beginnings</h1>
        <div id='app-info'>
          <h3><FontAwesomeIcon className='app-icon' icon={faDollarSign} /> Free Landscaping for New Homeowners</h3>
          <p>We offer no-cost landscaping solutions to welcome new homeowners.</p>
          <h3><FontAwesomeIcon className='app-icon' icon={faWandMagicSparkles} /> Custom Designs Tailored to Your Needs</h3>
          <p>Green Beginnings offers personalized landscape designs that reflect your style and make your new home feel welcoming.</p>
          <h3><FontAwesomeIcon className='app-icon' icon={faPeopleGroup} /> Community-Driven Support</h3>
          <p>Green Beginnings unites the community, fostering collective support for those in need.</p>
        </div>
      </div>
      <div className="right-half">
        <ServiceInquiryForm />
      </div>
    </div>
  );
}

export default Application;
