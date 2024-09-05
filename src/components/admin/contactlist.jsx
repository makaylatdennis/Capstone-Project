import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdatePopup = ({ contact, onUpdate, onCancel }) => {
  const LabelInput = ({ label, name, defaultValue }) => {
    return (
      <label>
        {label}:
        <input type="text" name={name} defaultValue={defaultValue} />
      </label>
    );
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Contact</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const updatedContact = {};
            for (const input of form.elements) {
              if (!input.id) {
                updatedContact[input.name] = input.value;
              }
            }
            console.log(updatedContact);
            await axios.put(
              `http://localhost:4000/api/contacts/${contact.id}`,
              updatedContact
            );
            onUpdate();
          }}
        >
          <>
            {contact &&
              Object.entries(contact).map((key, value) => (
                <LabelInput
                  label={key[0]}
                  name={key[0]}
                  defaultValue={key[1]}
                />
              ))}
          </>
          <button type="submit">Update</button>
        </form>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const DeletePopup = ({ contact, onDelete, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete Contact with ID:{contact.id}</h2>
        <p>Are you sure you want to delete this contact?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [error, setError] = useState(null);

  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/contacts");
      setContacts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/contact/${id}`);
      getContacts();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => getContacts(), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  return (
    <>
      <div className="contact-list">
        <h2>Contact List</h2>
        {showUpdatePopup && (
          <UpdatePopup
            contact={showUpdatePopup}
            onUpdate={() => {
              getContacts();
              setShowUpdatePopup(false);
            }}
            onCancel={() => setShowUpdatePopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            contact={showDeletePopup}
            onDelete={() => {
              console.log(showDeletePopup.id);
              deleteContact(showDeletePopup.id);
              setShowDeletePopup(false);
            }}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}
        <button onClick={getContacts}>Refresh</button>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <h3>ID: {contact.id}</h3>
              <p>Name: {contact.name}</p>
              <p>Email: {contact.email}</p>
              <p>Message: {contact.message}</p>
              <p>Status: {contact.status}</p>
              {!showUpdatePopup && (
                <button onClick={() => setShowUpdatePopup(contact)}>
                  Update
                </button>
              )}
              {!showDeletePopup && (
                <button onClick={() => setShowDeletePopup(contact)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
