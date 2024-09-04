// import React, { useEffect, useState } from 'react';
// import UserList from './components/userlist';
// import ContactList from './components/contactlist';
// import './admin.css';

// const AdminApp = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//     useEffect(() => {
//       axios.post('http://localhost:4000/api/login', {
//         email: 'Admin@gmail.com',
//         password: 'AdminPass',
//       }).then(response => {
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         }
//       }).catch(error => console.error(error));
//     }, []);
  
//     if (!isAuthenticated) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div>
//         <h1>Admin Dashboard</h1>
//         <UserList />
//         <ContactList />
//       </div>
//     );
//   };
  
//   export default AdminApp;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './userlist';
import ContactList from './contactlist';
import EventList from './eventlist';
import VolunteerList from './volunteerlist';
import './admin.css';

const AdminApp = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axios.post('http://localhost:4000/api/login', {
    //         email: 'admin@gmail.com',
    //         password: 'admin',
    //     }).then(response => {
    //         if (response.status === 200) {
    //             setIsAuthenticated(true);
    //         }
    //     }).catch(error => console.error(error))
    //       .finally(() => setLoading(false));
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!isAuthenticated) {
    //     return <div>Authentication failed. Please check your credentials.</div>;
    // }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <h2>Users</h2>
                <UserList />
            </div>
            <div className="dashboard-section">
                <h2>Contacts</h2>
                <ContactList />
            </div>
            <div className="dashboard-section">
                <h2>Events</h2>
                <EventList />
            </div>
            <div className="dashboard-section">
                <h2>Volunteers</h2>
                <VolunteerList />
            </div>
        </div>
    );
};

export default AdminApp;
