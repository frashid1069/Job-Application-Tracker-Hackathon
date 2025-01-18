import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import JobApplicationTracker from './components/JobApplicationTracker';
import Employers from './components/Employers';
import ResumeBuilder from './components/ResumeBulider';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="homepage">
        <Router basename="/home">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/job-application-tracker" element={<JobApplicationTracker />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
