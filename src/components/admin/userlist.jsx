import React, { useEffect, useState } from "react";
import axios from "axios";
import './userlist.css';

const UpdatePopup = ({ user, onUpdate, onCancel }) => {
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
        <h2>Update User</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const updatedUser = {};
            for (const input of form.elements) {
              if (!input.id) {
                updatedUser[input.name] = input.value;
              }
            }
            console.log(updatedUser);
            await axios.put(
              `http://localhost:4000/api/users/${user.id}`,
              updatedUser
            );
            onUpdate();
          }}
        >
          <>
            {user &&
              Object.entries(user).map((key, value) => (
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

const DeletePopup = ({ user, onDelete, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete User with ID:{user.id}</h2>
        <p>Are you sure you want to delete this user?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      setUsers(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      getUsers();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => getUsers(), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <>
      <div className="user-list">
        <h2>User List</h2>
        {showUpdatePopup && (
          <UpdatePopup
            user={showUpdatePopup}
            onUpdate={() => {
              getUsers();
              setShowUpdatePopup(false);
            }}
            onCancel={() => setShowUpdatePopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            user={showDeletePopup}
            onDelete={() => {
              console.log(showDeletePopup.id);
              deleteUser(showDeletePopup.id);
              setShowDeletePopup(false);
            }}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}
        <button onClick={getUsers}>Refresh</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>ID: {user.id}</h3>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {!showUpdatePopup && (
                <button onClick={() => setShowUpdatePopup(user)}>Update</button>
              )}
              {!showDeletePopup && (
                <button onClick={() => setShowDeletePopup(user)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
