import React, { useState, useRef } from 'react';
import './volform.css';

function Volform() {
    const [invalidfirstname, setInvalidFirstname] = useState(false);
    const [invalidLastname, setInvalidLastname] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState(false);

    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const message = useRef();

    function validation(entries) {
        const firstinput = firstname.current.value;
        const lastinput = lastname.current.value;
        const emailinput = email.current.value;
        const messageinput = message.current.value;

        const validFirstName = firstinput.length > 0;
        const validLastName = lastinput.length > 0;
        const validEmail = emailinput.includes('@');
        const validMessage = messageinput.length > 0;

        if (!validEmail) {
            setInvalidEmail(true);
        } else {
            setInvalidEmail(false);
        }

        if (!validFirstName) {
            setInvalidFirstname(true);
        } else {
            setInvalidFirstname(false);
        }

        if (!validLastName) {
            setInvalidLastname(true);
        } else {
            setInvalidLastname(false);
        }

        if (!validMessage) {
            setInvalidMessage(true);
        } else {
            setInvalidMessage(false);
        }
    }

    return (
        <>
            <div className='vol-form'>
    <div className='vol-header'>
        <h1>Sign up to Volunteer with Us!</h1>
        <h3>Sign up to join our volunteer team and stay informed about all upcoming opportunities!</h3>
    </div>
    
    <h3>Your Information</h3>

    <div id="first-last" className="form-row">
        <div className="input-box">
            <label htmlFor="firstName">First Name</label>
            <input 
                className='vol-input'
                id="firstName"
                name="firstName"
                type="text"
                ref={firstname}
            />
            {invalidfirstname && <div className="error"><p>First name is required.</p></div>}
        </div>

        <div className="input-box">
            <label htmlFor="lastName">Last Name</label>
            <input
                className='vol-input'
                id="lastName"
                name="lastName"
                type="text"
                ref={lastname}
            />
            {invalidLastname && <div className="error"><p>Last name is required.</p></div>}
        </div>
    </div>

    <div className="input-box">
        <label htmlFor="street-input">Street Address (Optional)</label>
        <input id='street-input' type='text' name='street address' />
    </div>

    <div className='form-row'>
        <div className="input-box">
            <label htmlFor="postalCode">Postal Code (Optional)</label>
            <input id='postalCode' className='vol-input2' type='text' name='Postal Code' />
        </div>
        <div className="input-box">
            <label htmlFor="city">City (Optional)</label>
            <input id='city' className='vol-input2' type='text' name='City' />
        </div>
        <div className="input-box">
            <label htmlFor="state">State (Optional)</label>
            <input id='state' className='vol-input2' type='text' name='State' />
        </div>
    </div>

    <div className="form-row">
        <div className="input-box">
            <label htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input id='phoneNumber' className='vol-input' type='text' name='Phone Number' />
        </div>
        <div className="input-box">
            <label htmlFor="email">Email (Optional)</label>
            <input
                id='email'
                className='vol-input'
                type='text'
                name='email'
                ref={email}
            />
            {invalidEmail && <div className="error"><p>Valid email is required.</p></div>}
        </div>
    </div>
</div>
</>
    );
}

export default Volform;
