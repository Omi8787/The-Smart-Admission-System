import { useEffect, useState } from "react";
import "./EligibilityPage.css";

function EligibilityPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [results, setResults] = useState({});       // Prolog
  const [sqlResults, setSqlResults] = useState({}); // SQL

  useEffect(() => {
    fetch("http://127.0.0.1:5000/students-full")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (id) => {
    const student = students.find((s) => s.student_id === id);
    setSelectedStudent(student);

    setResults({});
    setSqlResults({});
  };

  // ===============================
  // PROLOG
  // ===============================
  const checkBranch = async (branch) => {
    if (!selectedStudent) return;

    const res = await fetch(
      `http://127.0.0.1:5000/check-eligibility/${selectedStudent.student_id}`
    );
    const data = await res.json();

    setResults((prev) => ({
      ...prev,
      [branch]: data[branch],
    }));
  };

  // ===============================
  // SQL
  // ===============================
  const checkSQL = async (branch) => {
    if (!selectedStudent) return;

    const res = await fetch(
      `http://127.0.0.1:5000/check-sql-eligibility/${selectedStudent.student_id}`
    );
    const data = await res.json();

    setSqlResults((prev) => ({
      ...prev,
      [branch]: data[branch],
    }));
  };

  return (
    <div className="container">

      {/* ================= TABLE ================= */}
      <h2> The Smart Admission Eligibility & Branch Recommendation Tool</h2>
      <h2>All Students Data</h2>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Maths</th>
              <th>%</th>
              <th>JEE</th>
              <th>CET</th>
              <th>Preferred Branch</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.gender}</td>
                <td>{s.category}</td>
                <td>{s.physics}</td>
                <td>{s.chemistry}</td>
                <td>{s.maths}</td>
                <td>{s.percentage}</td>
                <td>{s.jee}</td>
                <td>{s.cet}</td>
                <td>{s.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= SELECT ================= */}
      <h3>Select Student</h3>

      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.student_id} value={s.student_id}>
            {s.name} ({s.student_id})
          </option>
        ))}
      </select>

      {/* ================= DETAILS ================= */}
      {selectedStudent && (
        <div className="details">
          <h3>Selected Student Details</h3>

          <p><b>Name:</b> {selectedStudent.name}</p>
          <p><b>ID:</b> {selectedStudent.student_id}</p>
          <p><b>Gender:</b> {selectedStudent.gender}</p>
          <p><b>Category:</b> {selectedStudent.category}</p>
          <p><b>Percentage:</b> {selectedStudent.percentage}</p>
          <p><b>Physics:</b> {selectedStudent.physics}</p>
          <p><b>Chemistry:</b> {selectedStudent.chemistry}</p>
          <p><b>Maths:</b> {selectedStudent.maths}</p>
          <p><b>JEE Score:</b> {selectedStudent.jee}</p>
          <p><b>CET Score:</b> {selectedStudent.cet}</p>
          <p><b>Preferred Branch:</b> {selectedStudent.branch}</p>
        </div>
      )}

      {/* ================= PROLOG ================= */}
      {selectedStudent && (
        <div className="queries">
          <h3>Prolog Queries</h3>

          {["computer", "it", "mechanical", "electronics", "civil"].map((b, i) => (
            <div key={b}>
              <span className="q-text">
                {i + 1}. Eligible For {b.toUpperCase()}
              </span>

              <button onClick={() => checkBranch(b)}>Check</button>

              <span className={results[b] === "yes" ? "yes" : "no"}>
                {results[b]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ================= SQL ================= */}
      {selectedStudent && (
        <div className="queries">
          <h3>SQL Queries</h3>

          {["computer", "it", "mechanical", "electronics", "civil"].map((b, i) => (
            <div key={b}>
              <span className="q-text">
                {i + 1}. Eligible For {b.toUpperCase()}
              </span>

              <button onClick={() => checkSQL(b)}>Check</button>

              <span className={sqlResults[b] === "yes" ? "yes" : "no"}>
                {sqlResults[b]}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default EligibilityPage;