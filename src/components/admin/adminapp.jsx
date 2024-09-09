import React, { useState, useEffect } from "react";
import UserList from "./userlist";
import ContactList from "./contactlist";
import EventList from "./eventlist";
import VolunteerList from "./volunteerlist";
import ApplicationList from "./applicationlist";
import "./admin.css";
import { useLocation, useNavigate } from "react-router-dom";

const AdminApp = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(
    useLocation().pathname.split("/")[2]
  );
  const url = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (url) {
      case "UserList":
        return <UserList />;
      case "ContactList":
        return <ContactList />;
      case "EventList":
        return <EventList />;
      case "VolunteerList":
        return <VolunteerList />;
      case "ApplicationList":
        return <ApplicationList />;
      default:
        return <UserList />;
    }
  };

  const checkAdmin = () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/checkAdmin", option)
      .then((res) => {
        if (res.status === 401 || res.status === 400) {
          setIsAdmin(false);
        } else if (res.status === 200) {
          setIsAdmin(true);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkAdmin();
  }, [isAdmin]);

  return isAdmin ? (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dropdown">
        <select
          value={url}
          onChange={(e) => {
            window.location.replace(`/admin/${e.target.value}`);
          }}
        >
          <option value="UserList">User List</option>
          <option value="ContactList">Contact List</option>
          <option value="EventList">Event List</option>
          <option value="VolunteerList">Volunteer List</option>
          <option value="ApplicationList">Application List</option>
        </select>
      </div>
      <div className="dashboard-section">{renderComponent()}</div>
    </div>
  ) : isAdmin === false ? (
    <div>
      <h1>Access Denied</h1>
    </div>
  ) : (
    <div>Checking Access...</div>
  );
};

export default AdminApp;
