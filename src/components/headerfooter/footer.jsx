import React from 'react';
import './footer.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="footer-col" id="footer1">
                        <div id="footer-logo"><img src='logo.png'/></div>
                        <input id="newsletter-input" name="newsletter" type="text" placeholder="example@mail.com" />
                        <button id="submit-bttn" onClick={() => console.log('Submit')}>Submit</button>
                        <h3>Connect With Us!</h3>
                        <div className="social-icons">
                     <a href="https://www.facebook.com" target="_blank" >
                     <FontAwesomeIcon icon={faFacebook} className="icon" />
                    </a>
                 <a href="https://www.twitter.com" target="_blank" >
                <FontAwesomeIcon icon={faTwitter} className="icon" />
                </a>
             <a href="https://www.instagram.com" target="_blank" >
          <FontAwesomeIcon icon={faInstagram} className="icon" />
         </a>
        <a href="https://www.linkedin.com" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>
      </div>
                    </div>


                    <div className="footer-col" id="footer2">
                        <h4>Quick Links</h4>
                        <ul>
                            <li className='footer-link'><Link to='/'>Home</Link></li>
                            <li className='footer-link'><Link to='/volunteer'>Volunteer</Link></li>
                            <li className='footer-link'><Link to='application'>Request Services</Link></li>
                            <li><p>Partners</p></li>
                            <li><p>Sign In</p></li>
                        </ul>
                    </div>

                    <div className="footer-col" id="footer2">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><p>Contact Us</p></li>
                            <li><p>FAQ</p></li>
                            <li><p>Partners</p></li>
                        </ul>
                    </div>


                    <div className="footer-col" id="footer3">
                        <h4>Legal</h4>
                        <ul>
                            <li><p>Privacy Policy</p></li>
                            <li><p>Terms of Use</p></li>
                            <li><p>Accessibility</p></li>
                            <li><p>Do Not Sell or Share</p></li>
                            <li><p>My Personal</p></li>
                            <li><p>Information</p></li>
                            <li><p>Consumer Health Data</p></li>
                            <li><p>Privacy Policy</p></li>
                            <li><p>Limit Use of My</p></li>
                            <li><p>Sensitive Personal</p></li>
                            <li><p>Information</p></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
    <p>© 2024 Green Beginnings. All rights reserved.</p>
  </div>


            </div>
        </footer>
    );
}

export default Footer;
