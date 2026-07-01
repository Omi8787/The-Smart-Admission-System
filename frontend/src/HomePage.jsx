import './HomePage.css';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <h1>Smart Admission System</h1>
        <p>Check your eligibility and explore branches easily</p>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h2>Welcome to Smart Admission Portal</h2>
        <p>
          Find the best course and branch based on your eligibility, marks, and interests.
        </p>

        {/* BUTTONS */}
        <div className="btn-group">
          <button
            className="btn"
            onClick={() => navigate("/result")}
          >
            Check Eligibility
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/student-details")}
          >
            Add Student Details
          </button>
        </div>
      </section>

      {/* BRANCH SECTION */}
      <section className="branches">
        <h2>Available Branches</h2>

        <div className="branch-container">
          <div className="card">
            <h3>Computer Engineering</h3>
            <p>Focus on programming, AI, and software development.</p>
          </div>

          <div className="card">
            <h3>Information Technology</h3>
            <p>Learn networking, databases, and system management.</p>
          </div>

          <div className="card">
            <h3>Mechanical Engineering</h3>
            <p>Design machines, engines, and mechanical systems.</p>
          </div>

          <div className="card">
            <h3>Civil Engineering</h3>
            <p>Build infrastructure like roads, bridges, and buildings.</p>
          </div>

          <div className="card">
            <h3>Electronics Engineering</h3>
            <p>Work with circuits, communication systems, and devices.</p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY INFO */}
      <section className="eligibility">
        <h2>Eligibility Criteria</h2>
        <ul>
          <li>Minimum 50% in PCM (Physics, Chemistry, Maths)</li>
          <li>Valid entrance exam score (MHT-CET / JEE)</li>
          <li>Reservation criteria as per government norms</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Smart Admission System | KGCE Project</p>
      </footer>
    </>
  );
}

export default HomePage;