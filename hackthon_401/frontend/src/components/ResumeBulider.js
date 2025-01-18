import React, { useState, useEffect } from 'react';
import '../css/ResumeBuilder.css';

function ResumeBuilder() {
  const [masterResume, setMasterResume] = useState({
    name: 'Master Resume',
    file: '',
    dateModified: ''
  });
  const [tailoredResumes, setTailoredResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch resumes from the API
    fetch('http://localhost:8000/api/resumes/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const fetchedResumes = data.map(resume => ({
          id: resume.id,
          file: resume.file,
          name: `Resume ${resume.id}`,
          dateModified: new Date().toLocaleDateString()
        }));
        setTailoredResumes(fetchedResumes);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e, resumeType = 'master', index = null) => {
    const { name, value } = e.target;
    if (resumeType === 'master') {
      setMasterResume({ ...masterResume, [name]: value });
    } else {
      const newResumes = [...tailoredResumes];
      newResumes[index][name] = value;
      newResumes[index].dateModified = new Date().toLocaleDateString(); // Update the date modified
      setTailoredResumes(newResumes);
    }
  };

  const createTailoredResume = () => {
    setTailoredResumes([...tailoredResumes, { ...masterResume, name: `Tailored Resume ${tailoredResumes.length + 1}`, dateModified: new Date().toLocaleDateString() }]);
  };

  const saveMasterResume = () => {
    // Save the master resume to the server or local storage
    alert('Master resume saved!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ResumeBuilder">
      <h2>Welcome, Colton</h2>
      <div className="resume-form">
        <h3>Master Resume Template</h3>
        <input
          type="text"
          name="name"
          value={masterResume.name}
          onChange={(e) => handleInputChange(e, 'master')}
          placeholder="Name"
        />
        <input
          type="file"
          name="file"
          onChange={(e) => handleInputChange(e, 'master')}
          placeholder="File"
        />
        <p>Date Modified: {masterResume.dateModified}</p>
        <button onClick={saveMasterResume}>Save Master Resume</button>
        <button onClick={createTailoredResume}>Create Tailored Resume</button>
      </div>

      <div className="tailored-resumes">
        {tailoredResumes.map((resume, index) => (
          <div key={index} className="resume-form">
            <h3>{resume.name}</h3>
            <input
              type="text"
              name="name"
              value={resume.name}
              onChange={(e) => handleInputChange(e, 'tailored', index)}
              placeholder="Name"
            />
            <input
              type="file"
              name="file"
              onChange={(e) => handleInputChange(e, 'tailored', index)}
              placeholder="File"
            />
            <p>Date Modified: {resume.dateModified}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeBuilder;
