import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdatePopup = ({ application, onUpdate, onCancel }) => {
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
        <h2>Update Application</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const updatedApplication = {};
            for (const input of form.elements) {
              if (!input.id) {
                updatedApplication[input.name] = input.value;
              }
            }
            console.log(updatedApplication);
            await axios.put(
              `/api/applications/${application.id}`,
              updatedApplication
            );
            onUpdate();
          }}
        >
          <>
            {application &&
              Object.entries(application).map((key, value) => (
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

const DeletePopup = ({ application, onDelete, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete Application with ID:{application.id}</h2>
        <p>Are you sure you want to delete this application?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};
const ApprovePopup = ({ application, onApprove, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Approve Application with ID:{application.id}</h2>
        <p>Are you sure you want to approve this application?</p>
        <button onClick={onApprove}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [error, setError] = useState(null);
  const [getBy, setGetBy] = useState("");

  const getApplications = async () => {
    try {
      const response = await axios.get(
        `/api/applications${!getBy ? "" : `/${getBy}`}`
      );
      setApplications(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`/api/applications/${id}`);
      getApplications();
    } catch (error) {
      setError(error);
    }
  };

  const approve_rejectApplication = async (id, approve) => {
    try {
      if (approve) {
        await axios.put(`/api/applications/approve/${id}`);
      } else {
        await axios.put(`/api/applications/reject/${id}`);
      }
      getApplications();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => getApplications(), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching applications: {error.message}</div>;
  }

  return (
    <>
      <div className="application-list">
        <h2>Application List</h2>
        {showUpdatePopup && (
          <UpdatePopup
            application={showUpdatePopup}
            onUpdate={() => {
              getApplications();
              setShowUpdatePopup(false);
            }}
            onCancel={() => setShowUpdatePopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            application={showDeletePopup}
            onDelete={() => {
              console.log(showDeletePopup.id);
              deleteApplication(showDeletePopup.id);
              setShowDeletePopup(false);
            }}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}
        {showApprovePopup && (
          <ApprovePopup
            application={showApprovePopup}
            onApprove={() => {
              console.log(showApprovePopup.id);
              approve_rejectApplication(showApprovePopup.id, true);
              setShowApprovePopup(false);
            }}
            onCancel={() => setShowApprovePopup(false)}
          />
        )}
        {showRejectPopup && (
          <ApprovePopup
            application={showRejectPopup}
            onApprove={() => {
              console.log(showRejectPopup.id);
              approve_rejectApplication(showRejectPopup.id, false);
              setShowRejectPopup(false);
            }}
            onCancel={() => setShowRejectPopup(false)}
          />
        )}
        <button onClick={getApplications}>Refresh</button>
        <button
          onClick={() => {
            setGetBy("pending");
            getApplications();
          }}
        >
          getPending
        </button>
        <button
          onClick={() => {
            setGetBy("approved");
            getApplications();
          }}
        >
          getApproved
        </button>
        <button
          onClick={() => {
            setGetBy("rejected");
            getApplications();
          }}
        >
          getRejected
        </button>
        <button
          onClick={() => {
            setGetBy("");
            getApplications();
          }}
        >
          getAll
        </button>
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <h3>ID: {application.id}</h3>
              <p>
                firstName: {application.firstName} lastName:
                {application.lastName}
              </p>
              <p>Email: {application.email}</p>
              <p>Phone: {application.phone}</p>
              <p>Address: {application.address}</p>
              {!showUpdatePopup && (
                <button onClick={() => setShowUpdatePopup(application)}>
                  Update
                </button>
              )}
              {!showDeletePopup && (
                <button onClick={() => setShowDeletePopup(application)}>
                  Delete
                </button>
              )}
              {!showApprovePopup && (
                <button onClick={() => setShowApprovePopup(application)}>
                  Approve
                </button>
              )}
              {!showApprovePopup && (
                <button onClick={() => setShowRejectPopup(application)}>
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

export default ApplicationList;
