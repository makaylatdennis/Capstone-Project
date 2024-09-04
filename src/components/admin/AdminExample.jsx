import { get } from "cypress/types/lodash";
import React, { useState, useEffect } from "react";

const UpdatePopup = ({ id, type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:4000/api/${type}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [id, type]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/api/${type}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="popup">
      {data && (
        <form onSubmit={handleSubmit}>
          {Object.keys(data).map(
            (key) =>
              key !== "id" && (
                <label key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <input
                    type="text"
                    name={key}
                    value={data[key]}
                    onChange={handleInputChange}
                  />
                </label>
              )
          )}
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

const AdminExample = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  getUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  return (
    <div>
      <h1>Admin Example</h1>
      <div id="users">
        <button onClick={getUsers}>Get Users</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div id="events"></div>
      <div id="applications"></div>
      <div id="volunteers"></div>
      <div id="contacts"></div>
    </div>
  );
};

export default AdminExample;
