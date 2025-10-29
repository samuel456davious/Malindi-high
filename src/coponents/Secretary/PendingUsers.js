import React, { useState, useEffect } from 'react';
import API from '../Authentication/api';
import './PendingUsersManagement.css';

export default function PendingUsersManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');
  const [showApproveForm, setShowApproveForm] = useState(false);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = () => {
    API.get('/pending_users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setRole('');
    setMsg('');
    setShowApproveForm(true);
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    if (!selectedUser || !role) {
      setMsg('Please select a role');
      return;
    }

    try {
      const res = await API.post('/approve', { 
        username: selectedUser.username, 
        role 
      });
      setMsg(res.data.msg);
      
      // Refresh the pending users list
      fetchPendingUsers();
      
      // Reset form after successful approval
      setTimeout(() => {
        setShowApproveForm(false);
        setSelectedUser(null);
        setRole('');
        setMsg('');
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error approving user');
    }
  };

  const cancelApprove = () => {
    setShowApproveForm(false);
    setSelectedUser(null);
    setRole('');
    setMsg('');
  };

  return (
    <div className="pending-users-management__container">
      <div className="pending-users-management__main-content">
        <h2 className="pending-users-management__title">Pending Users</h2>
        
        <div className="pending-users-management__list-container">
          <ul className="pending-users-management__user-list">
            {users.map((user) => (
              <li 
                key={user.username} 
                className={`pending-users-management__user-item ${
                  selectedUser?.username === user.username ? 'pending-users-management__user-item--selected' : ''
                }`}
                onClick={() => handleUserClick(user)}
              >
                <span className="pending-users-management__username">{user.username}</span>
                <span className="pending-users-management__user-role">
                  ({user.role || 'N/A'})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {showApproveForm && selectedUser && (
          <div className="pending-users-management__approve-section">
            <div className="pending-users-management__approve-card">
              <h3 className="pending-users-management__approve-title">
                Approve User: {selectedUser.username}
              </h3>
              
              <form onSubmit={handleApprove} className="pending-users-management__approve-form">
                <select 
                  className="pending-users-management__role-select"
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="student_secretary">Student Secretary</option>
                  <option value="secretary">Secretary</option>
                </select>
                
                <div className="pending-users-management__button-group">
                  <button 
                    type="submit" 
                    className="pending-users-management__approve-btn"
                  >
                    Approve User
                  </button>
                  <button 
                    type="button" 
                    onClick={cancelApprove}
                    className="pending-users-management__cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {msg && (
                <div className={`pending-users-management__message ${
                  msg.includes('Error') ? 'pending-users-management__message--error' : 'pending-users-management__message--success'
                }`}>
                  {msg}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}