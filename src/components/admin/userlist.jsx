// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/users')
//       .then(response => setUsers(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="user-list">
//       <h2>User List</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/users')
      .then(response =>{ console.log(response); 
        setUsers(response.data)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
