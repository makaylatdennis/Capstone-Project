import React, { useEffect, useState } from "react";
import axios from "axios";
import "./eventlist.css";

const LabelInput = ({ label, name, defaultValue, type }) => {
  return (
    <label>
      {label}:
      <input type={type || "text"} name={name} defaultValue={defaultValue} />
    </label>
  );
};

const UpdatePopup = ({ event, onUpdate, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Event</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const updatedEvent = {};
            for (const input of form.elements) {
              if (!input.id) {
                updatedEvent[input.name] = input.value;
              }
            }
            console.log(updatedEvent);
            await axios.put(
              `http://localhost:4000/api/events/${event.id}`,
              updatedEvent
            );
            onUpdate();
          }}
        >
          <>
            {event &&
              Object.entries(event).map((key, value) => (
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

const DeletePopup = ({ event, onDelete, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete Event with ID:{event.id}</h2>
        <p>Are you sure you want to delete this event?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};
const ApprovePopup = ({ event, onApprove, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Approve Event with ID:{event.id}</h2>
        <p>Are you sure you want to approve this event?</p>
        <button onClick={onApprove}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};
const CreatePopup = ({ onCreate, onCancel }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`; // Format HH:MM
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Create Event</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const newEvent = {};
            for (const input of form.elements) {
              if (!input.id) {
                newEvent[input.name] = input.value;
              }
            }
            console.log(newEvent);
            await axios.post(`http://localhost:4000/api/events`, newEvent);
            onCreate();
          }}
        >
          <LabelInput label="name" name="name" defaultValue={""} />
          <LabelInput
            label="userID"
            name="userID"
            defaultValue={""}
            type="number"
          />
          <LabelInput
            label="date"
            name="date"
            defaultValue={getCurrentDate}
            type="date"
          />
          <LabelInput
            label="time"
            name="time"
            defaultValue={getCurrentTime}
            type="time"
          />
          <LabelInput
            label="description"
            name="description"
            defaultValue={""}
          />
          <select name="status">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button type="submit">Create</button>
        </form>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [error, setError] = useState(null);
  const [getBy, setGetBy] = useState("");

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/events${!getBy ? "" : `/${getBy}`}`
      );
      setEvents(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/events/${id}`);
      getEvents();
    } catch (error) {
      setError(error);
    }
  };

  const approve_rejectEvent = async (id, approve) => {
    try {
      if (approve) {
        await axios.put(`http://localhost:4000/api/events/approve/${id}`);
      } else {
        await axios.put(`http://localhost:4000/api/events/reject/${id}`);
      }
      getEvents();
    } catch (error) {
      setError(error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get the month, day, and year
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Combine into the desired format
    return `${month}-${day}-${year}`;
  }

  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Determine AM or PM suffix
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hour from 24-hour time to 12-hour time
    const hour12 = hours % 12 || 12; // Convert '0' hour to '12'

    // Format the hour, minutes, and seconds with leading zeros if necessary
    return `${hour12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
  }

  useEffect(() => getEvents(), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <>
      <div className="event-list">
        <h2>Event List</h2>
        {showUpdatePopup && (
          <UpdatePopup
            event={showUpdatePopup}
            onUpdate={() => {
              getEvents();
              setShowUpdatePopup(false);
            }}
            onCancel={() => setShowUpdatePopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            event={showDeletePopup}
            onDelete={() => {
              console.log(showDeletePopup.id);
              deleteEvent(showDeletePopup.id);
              setShowDeletePopup(false);
            }}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}
        {showApprovePopup && (
          <ApprovePopup
            event={showApprovePopup}
            onApprove={() => {
              console.log(showApprovePopup.id);
              approve_rejectEvent(showApprovePopup.id, true);
              setShowApprovePopup(false);
            }}
            onCancel={() => setShowApprovePopup(false)}
          />
        )}
        {showRejectPopup && (
          <ApprovePopup
            event={showRejectPopup}
            onApprove={() => {
              console.log(showRejectPopup.id);
              approve_rejectEvent(showRejectPopup.id, false);
              setShowRejectPopup(false);
            }}
            onCancel={() => setShowRejectPopup(false)}
          />
        )}
        {showCreatePopup && (
          <CreatePopup
            onCreate={() => {
              getEvents();
              setShowCreatePopup(false);
            }}
            onCancel={() => setShowCreatePopup(false)}
          />
        )}
        <button onClick={getEvents}>Refresh</button>
        <button
          onClick={() => {
            setGetBy("pending");
            getEvents();
          }}
        >
          getPending
        </button>
        <button
          onClick={() => {
            setGetBy("approved");
            getEvents();
          }}
        >
          getApproved
        </button>
        <button
          onClick={() => {
            setGetBy("rejected");
            getEvents();
          }}
        >
          getRejected
        </button>
        <button
          onClick={() => {
            setGetBy("");
            getEvents();
          }}
        >
          getAll
        </button>
        {!showCreatePopup && (
          <button onClick={() => setShowCreatePopup(true)}>Create</button>
        )}
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>ID: {event.id}</h3>
              <p>Name: {event.name}</p>
              <p>Date: {formatDate(event.date)}</p>
              <p>Time: {formatTime(event.time)}</p>
              <p>Description: {event.description}</p>
              <p>Status: {event.status}</p>
              {!showUpdatePopup && (
                <button onClick={() => setShowUpdatePopup(event)}>
                  Update
                </button>
              )}
              {!showDeletePopup && (
                <button onClick={() => setShowDeletePopup(event)}>
                  Delete
                </button>
              )}
              {!showApprovePopup && (
                <button onClick={() => setShowApprovePopup(event)}>
                  Approve
                </button>
              )}
              {!showApprovePopup && (
                <button onClick={() => setShowRejectPopup(event)}>
                  Reject
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventList;
