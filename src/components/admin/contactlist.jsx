// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/contacts')
//       .then(response => setContacts(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="contact-list">
//       <h2>Contact List</h2>
//       <ul>
//         {contacts.map(contact => (
//           <li key={contact.id}>{contact.name} - {contact.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ContactList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/contacts')
      .then(response => setContacts(response.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

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
