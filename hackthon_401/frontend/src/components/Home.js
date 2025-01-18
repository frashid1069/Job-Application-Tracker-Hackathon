import React from 'react';
import '../css/Home.css';
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const goToApplication = () => { navigate('/job-application-tracker'); };
  return (
    <div className="Home">
      <nav className="NavigationBar">
        <div className="logo">JobSeeker</div>
        <ul>
          <li><Link to="/job-application-tracker">Job Application Tracker</Link></li>
          <li><Link to="/resume-builder">Resume Builder</Link></li> 
          <li><Link to="/employers">Employers</Link></li>
          <li>More</li>
        </ul>
        <div className="auth-buttons">
          <button onClick={goToApplication}>Log In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      <div className='home-info'>
        <h1>Your entire job search. Powered by one profile.</h1>
        <p>Get personalized job recommendations, craft tailored resumes, autofill and track your job applications. We're here for every step of the process.</p>
        <button>Sign Up – It's Free!</button>
        <p>Over 500,000 job seekers use JobSeeker.</p>
      </div>
      
    </div>
  );
}

export default Home;
