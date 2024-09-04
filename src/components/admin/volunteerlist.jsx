import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/volunteer')
      .then(response => setVolunteers(response.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching volunteers: {error.message}</div>;
  }

  return (
    <div className="volunteer-list">
      <h2>Volunteer List</h2>
      <ul>
        {volunteers.map(volunteer => (
          <li key={volunteer.id}>{volunteer.name} - {volunteer.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerList;


