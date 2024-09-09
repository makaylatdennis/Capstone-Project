import React, { useState, useRef } from 'react';
import './service.css'

function ServiceInquiryForm() {
    const [invalidFirstName, setInvalidFirstName] = useState(false);
    const [invalidLastName, setInvalidLastName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [invalidService, setInvalidService] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const serviceRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();

    function validateForm() {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const service = serviceRef.current.value;

        const validFirstName = firstName.length > 0;
        const validLastName = lastName.length > 0;
        const validEmail = email.includes('@');
        const validPhoneNumber = phoneNumber.length > 0 && /^\d+$/.test(phoneNumber);
        const validService = service.length > 0;

        setInvalidFirstName(!validFirstName);
        setInvalidLastName(!validLastName);
        setInvalidEmail(!validEmail);
        setInvalidPhoneNumber(!validPhoneNumber);
        setInvalidService(!validService);

        return validFirstName && validLastName && validEmail && validPhoneNumber && validService;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                phone: phoneNumberRef.current.value,
                service: serviceRef.current.value,
                address: streetRef.current.value,
                zip: postalCodeRef.current.value,
                city: cityRef.current.value,
                state: stateRef.current.value
            };
    
            try {
                const response = await fetch('/api/applications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    alert('Your service inquiry has been successfully submitted!');
                    console.log('Form submitted successfully');
                } else {
                    const errorResponse = await response.json();
                    console.error('Submission failed', errorResponse); 
                }
            } catch (error) {
                console.error('Error submitting the form', error); 
            }
        } else {
            console.log('Validation failed');
        }
    }
    

    return (
        <div className='service-inquiry-container'>
            <div className='service-inquiry-content'>
                <h1>Service Inquiry Form</h1>
                <h3>Please provide your details and the service you need.</h3>
                <p>Fill out the form below to request our landscaping services.</p>
                
                <div className="input-box">
                    <label htmlFor="serviceFirstName">First Name</label>
                    <input 
                        className='service-input'
                        id="serviceFirstName"
                        name="serviceFirstName"
                        type="text"
                        ref={firstNameRef}
                        required
                    />
                    {invalidFirstName && <div className="error"><p>First name is required.</p></div>}
                </div>
                
                <div className="input-box">
                    <label htmlFor="serviceLastName">Last Name</label>
                    <input
                        className='service-input'
                        id="serviceLastName"
                        name="serviceLastName"
                        type="text"
                        ref={lastNameRef}
                        required
                    />
                    {invalidLastName && <div className="error"><p>Last name is required.</p></div>}
                </div>
    
                <div className="input-box">
                    <label htmlFor="serviceStreet">Street Address</label>
                    <input id='serviceStreet' type='text' name='serviceStreet' className="service-input" ref={streetRef} required />
                </div>
    
                <div className='form-row2'>
                    <div className="input-box">
                        <label htmlFor="servicePostalCode">Postal Code</label>
                        <input id='servicePostalCode' className='service-input2' type='text' name='servicePostalCode' ref={postalCodeRef} required />
                    </div>
                    <div className="input-box">
                        <label htmlFor="serviceCity">City</label>
                        <input id='serviceCity' className='service-input2' type='text' name='serviceCity' ref={cityRef} required />
                    </div>
                    <div className="input-box">
                        <label htmlFor="serviceState">State</label>
                        <input id='serviceState' className='service-input2' type='text' name='serviceState' ref={stateRef} required />
                    </div>
                </div>
    
                <div className="form-row2">
                    <div className="input-box">
                        <label htmlFor="servicePhoneNumber">Phone Number</label>
                        <input 
                            id='servicePhoneNumber' 
                            className='service-input' 
                            type='text' 
                            name='servicePhoneNumber' 
                            ref={phoneNumberRef}
                            required 
                        />
                        {invalidPhoneNumber && <div className="error"><p>Valid phone number is required.</p></div>}
                    </div>
                    <div className="input-box">
                        <label htmlFor="serviceEmail">Email</label>
                        <input
                            id='serviceEmail'
                            className='service-input'
                            type='email'
                            name='serviceEmail'
                            ref={emailRef}
                            required
                        />
                        {invalidEmail && <div className="error"><p>Valid email is required.</p></div>}
                    </div>
                </div>
    
                <div className="input-box">
                    <label htmlFor="serviceNeeded">Service Needed</label>
                    <textarea
                        id='serviceNeeded'
                        className='service-textarea'
                        name='serviceNeeded'
                        ref={serviceRef}
                        required
                    />
                    {invalidService && <div className="error"><p>Service description is required.</p></div>}
                </div>
    
                <button type="submit" className="service-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default ServiceInquiryForm;
