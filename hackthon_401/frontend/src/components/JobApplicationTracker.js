import React, { useState, useEffect } from 'react';
import '../css/JobApplicationTracker.css';

function JobApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    date: '',
    status: 'applied'
  });

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8000/api/jobapplications/') // Update with your API URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedData = data.map(app => ({
          id: app.id,
          company: app.company_name,
          position: app.job.position,
          date: app.date_applied,
          status: app.status,
          title: app.job.title,
          description: app.job.description,
          notes: app.notes,
          resume: app.resume,
          user: app.user,
        }));
        setApplications(formattedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const addApplication = () => {
    setApplications([...applications, { ...newApplication, id: applications.length + 1 }]);
    setNewApplication({ company: '', position: '', date: '', status: 'applied' });
  };

  const updateApplicationStatus = (index, newStatus) => {
    const updatedApplications = applications.map((app, i) => 
      i === index ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  };

  const editApplication = (index) => {
    setEditingIndex(index);
    setEditingApplication({ ...applications[index] });
  };

  const saveApplication = () => {
    const updatedApplications = applications.map((app, i) =>
      i === editingIndex ? editingApplication : app
    );
    setApplications(updatedApplications);
    setEditingIndex(null);
    setEditingApplication(null);
  };

  const deleteApplication = (index) => {
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);
  };

  const handleInputChange = (e, applicationType = 'editing') => {
    const { name, value } = e.target;
    if (applicationType === 'editing') {
      setEditingApplication({ ...editingApplication, [name]: value });
    } else {
      setNewApplication({ ...newApplication, [name]: value });
    }
  };

  const categorizedApplications = {
    Applied: applications.filter(app => app.status === 'applied'),
    Interview: applications.filter(app => app.status === 'interview'),
    Offer: applications.filter(app => app.status === 'offer'),
    Rejection: applications.filter(app => app.status === 'rejection')
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="JobApplicationTracker">
      <h2>Welcome, Colton</h2>

      {editingIndex !== null && (
        <div className="edit-form">
          <h3>Edit Application</h3>
          <input
            type="text"
            name="company"
            value={editingApplication.company}
            onChange={(e) => handleInputChange(e, 'editing')}
            placeholder="Company Name"
          />
          <input
            type="text"
            name="position"
            value={editingApplication.position}
            onChange={(e) => handleInputChange(e, 'editing')}
            placeholder="Position"
          />
          <input
            type="date"
            name="date"
            value={editingApplication.date}
            onChange={(e) => handleInputChange(e, 'editing')}
            placeholder="Date Applied"
          />
          <select
            name="status"
            value={editingApplication.status}
            onChange={(e) => handleInputChange(e, 'editing')}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejection">Rejection</option>
          </select>
          <button onClick={saveApplication}>Save</button>
          <button onClick={() => setEditingIndex(null)}>Cancel</button>
        </div>
      )}

      {Object.keys(categorizedApplications).map((status) => (
        <div key={status}>
          <h3>{status}</h3>
          <table className="application-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorizedApplications[status].map((app, index) => (
                <tr key={index}>
                  <td>{app.company}</td>
                  <td>{app.position}</td>
                  <td>{app.date}</td>
                  <td>{app.status}</td>
                  <td>
                    <button onClick={() => updateApplicationStatus(index, 'interview')}>Move to Interview</button>
                    <button onClick={() => updateApplicationStatus(index, 'offer')}>Move to Offer</button>
                    <button onClick={() => updateApplicationStatus(index, 'rejection')}>Move to Rejection</button>
                    <button onClick={() => editApplication(index)}>Edit</button>
                    <button onClick={() => deleteApplication(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="add-form">
        <h3>Add New Application</h3>
        <input
          type="text"
          name="company"
          value={newApplication.company}
          onChange={(e) => handleInputChange(e, 'new')}
          placeholder="Company Name"
        />
        <input
          type="text"
          name="position"
          value={newApplication.position}
          onChange={(e) => handleInputChange(e, 'new')}
          placeholder="Position"
        />
        <input
          type="date"
          name="date"
          value={newApplication.date}
          onChange={(e) => handleInputChange(e, 'new')}
          placeholder="Date Applied"
        />
        <select
          name="status"
          value={newApplication.status}
          onChange={(e) => handleInputChange(e, 'new')}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejection">Rejection</option>
        </select>
        <button onClick={addApplication}>Add Application</button>
      </div>
    </div>
  );
}

export default JobApplicationTracker;
