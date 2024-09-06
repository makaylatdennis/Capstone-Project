import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./userlist";
import ContactList from "./contactlist";
import EventList from "./eventlist";
import VolunteerList from "./volunteerlist";
import ApplicationList from "./applicationlist";
import "./admin.css";

const AdminApp = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-section">
        <UserList />
      </div>
      <div className="dashboard-section">
        <ContactList />
      </div>
      <div className="dashboard-section">
        <EventList />
      </div>
      <div className="dashboard-section">
        <VolunteerList />
      </div>
      <div className="dashboard-section">
        <ApplicationList />
      </div>
    </div>
  );
};

export default AdminApp;
