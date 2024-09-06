// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserList from "./userlist";
// import ContactList from "./contactlist";
// import EventList from "./eventlist";
// import VolunteerList from "./volunteerlist";
// import ApplicationList from "./applicationlist";
// import "./admin.css";

// const AdminApp = () => {
//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <div className="dashboard-section">
//         <UserList />
//       </div>
//       <div className="dashboard-section">
//         <ContactList />
//       </div>
//       <div className="dashboard-section">
//         <EventList />
//       </div>
//       <div className="dashboard-section">
//         <VolunteerList />
//       </div>
//       <div className="dashboard-section">
//         <ApplicationList />
//       </div>
//     </div>
//   );
// };

//export default AdminApp;

import React, { useState } from "react";
import UserList from "./userlist";
import ContactList from "./contactlist";
import EventList from "./eventlist";
import VolunteerList from "./volunteerlist";
import ApplicationList from "./applicationlist";
import "./admin.css";
import { useLocation, useNavigate } from "react-router-dom";

const AdminApp = () => {
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
      // default:
      //   return <UserList />;
    }
  };

  return (
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
  );
};

export default AdminApp;
