import React from 'react';
import '../css/Home.css';

function Home() {
  return (
    <div className="Home">
      <nav className="NavigationBar">
        <div className="logo">JobSeeker</div>
        <ul>
          <li>Job Application Tracker</li>
          <li>Resume Builder</li>
          <li>Employers</li>
          <li>More</li>
        </ul>
        <div className="auth-buttons">
          <button>Log In</button>
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
