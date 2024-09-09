import React, { useEffect, useState } from "react";
import axios from "axios";
import "./volunteerlist.css";

const UpdatePopup = ({ volunteer, onUpdate, onCancel }) => {
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
        <h2>Update Volunteer</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const updatedVolunteer = {};
            for (const input of form.elements) {
              if (!input.id) {
                updatedVolunteer[input.name] = input.value;
              }
            }
            console.log(updatedVolunteer);
            await axios.put(`/api/volunteer/${volunteer.id}`, updatedVolunteer);
            onUpdate();
          }}
        >
          <>
            {volunteer &&
              Object.entries(volunteer).map((key, value) => (
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

const DeletePopup = ({ volunteer, onDelete, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete Volunteer with ID:{volunteer.id}</h2>
        <p>Are you sure you want to delete this volunteer?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [error, setError] = useState(null);

  const getVolunteers = async () => {
    try {
      const response = await axios.get("/api/volunteer");
      setVolunteers(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      await axios.delete(`/api/volunteer/${id}`);
      getVolunteers();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching volunteers: {error.message}</div>;
  }

  return (
    <>
      <div className="volunteer-list">
        <h2>Volunteer List</h2>
        {showUpdatePopup && (
          <UpdatePopup
            volunteer={showUpdatePopup}
            onUpdate={() => {
              getVolunteers();
              setShowUpdatePopup(false);
            }}
            onCancel={() => setShowUpdatePopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            volunteer={showDeletePopup}
            onDelete={() => {
              console.log(showDeletePopup.id);
              deleteVolunteer(showDeletePopup.id);
              setShowDeletePopup(false);
            }}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}
        <button onClick={getVolunteers} className="refresh">
          Refresh
        </button>
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer.id}>
              <h3>ID: {volunteer.id}</h3>
              <p>
                firstName: {volunteer.firstName} lastName: {volunteer.lastName}
              </p>
              <p>Email: {volunteer.email}</p>
              <p>Phone: {volunteer.phone}</p>
              <p>Address: {volunteer.address}</p>
              {!showUpdatePopup && (
                <button onClick={() => setShowUpdatePopup(volunteer)}>
                  Update
                </button>
              )}
              {!showDeletePopup && (
                <button onClick={() => setShowDeletePopup(volunteer)}>
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

export default VolunteerList;
