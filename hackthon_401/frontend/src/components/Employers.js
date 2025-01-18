import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Employers.css';

function Employers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8000/api/jobs/') // Update with your API URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const applyForJob = (job) => {
    // Assume user ID is 1 for simplicity
    const newApplication = {
      company: job.title,
      position: job.position,
      date: new Date().toISOString().split('T')[0], // current date
      status: 'applied',
    };

    // Add application to the server or application state here
    fetch('http://localhost:8000/api/jobapplications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newApplication)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Redirect to job applications page
      navigate('/job-application-tracker');
    })
    .catch(error => {
      setError(error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Employers">
      <h2>Welcome, Colton</h2>
      <table className="employers-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Position</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.position}</td>
              <td>{job.description}</td>
              <td>{new Date(job.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employers;
