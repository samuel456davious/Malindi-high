import React, { useState } from 'react';
import API from '../Authentication/api';

export default function ApproveUser() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/approve', { username, role });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error approving user');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Approve User</h2>
      <form onSubmit={handleApprove}>
        <input className="form-control mb-2" placeholder="Username"
               value={username} onChange={(e) => setUsername(e.target.value)} />
        <select className="form-control mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="student_secretary">Student Secretary</option>
          <option value="secretary">Secretary</option>
        </select>
        <button className="btn btn-primary">Approve</button>
      </form>
      {msg && <div className="mt-3 alert alert-info">{msg}</div>}
    </div>
  );
}
