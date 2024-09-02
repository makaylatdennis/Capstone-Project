import React, { useEffect, useState } from 'react';
import UserList from './components/userlist';
import ContactList from './components/contactlist';
import './admin.css';

const AdminApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      axios.post('http://localhost:4000/api/login', {
        email: 'Admin@gmail.com',
        password: 'AdminPass',
      }).then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      }).catch(error => console.error(error));
    }, []);
  
    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <UserList />
        <ContactList />
      </div>
    );
  };
  
  export default AdminApp;
