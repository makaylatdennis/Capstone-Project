import React, { useState, useRef } from 'react';
import './volform.css';

function Volform() {
    const [invalidFirstName, setInvalidFirstName] = useState(false);
    const [invalidLastName, setInvalidLastName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();

    function validateForm() {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;

        const isValidFirstName = firstName.length > 0;
        const isValidLastName = lastName.length > 0;
        const isValidEmail = email.includes('@');

        setInvalidFirstName(!isValidFirstName);
        setInvalidLastName(!isValidLastName);
        setInvalidEmail(!isValidEmail);

        return isValidFirstName && isValidLastName && isValidEmail;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully');
        } else {
            console.log('Validation failed');
        }
    }

    return (
        <div className='vol-form'>
            <div className='vol-header'>
                <h1>Sign up to Volunteer with Us!</h1>
                <h3>Sign up to join our volunteer team and stay informed about all upcoming opportunities!</h3>
            </div>

            <h3>Your Information</h3>

            <div id="first-last">
                <div className="input-box">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        className='vol-input'
                        id="firstName"
                        name="firstName"
                        type="text"
                        ref={firstNameRef}
                    />
                    {invalidFirstName && <div className="error"><p>First name is required.</p></div>}
                </div>

                <div className="input-box">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        className='vol-input'
                        id="lastName"
                        name="lastName"
                        type="text"
                        ref={lastNameRef}
                    />
                    {invalidLastName && <div className="error"><p>Last name is required.</p></div>}
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
                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        className='vol-input'
                        type='email'
                        name='email'
                        ref={emailRef}
                        required
                    />
                    {invalidEmail && <div className="error"><p>Valid email is required.</p></div>}
                </div>
            </div>

            <button type="submit" id="vol-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Volform;
