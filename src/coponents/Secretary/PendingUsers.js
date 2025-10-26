import React, { useState, useEffect } from 'react';
import API from '../Authentication/api';

export default function PendingUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/pending_users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Pending Users</h2>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u.username} className="list-group-item">
            {u.username} ({u.role || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
}
