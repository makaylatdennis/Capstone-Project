import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.name} - {contact.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
