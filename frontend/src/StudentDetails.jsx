import { useState } from "react";
import "./StudentDetails.css";

function StudentDetails() {
  const [student, setStudent] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    category: "",
    state: "",
    city: "",
    pincode: "",
    physics: "",
    chemistry: "",
    maths: "",
    total: "",
    percentage: "",
    jeeScore: "",
    cetScore: "",
    schoolName: "",
    yearOfPassing: "",
    board: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    preferredBranch: "",
    remarks: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      // ✅ Check if response is OK
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();

      console.log("Response:", data); // DEBUG

      // ✅ Fix undefined issue
      if (data && data.message) {
        setMessage(data.message);
        alert(data.message);
      } else {
        setMessage("Data saved successfully!");
        alert("Data saved successfully!");
      }

      // ✅ Optional: Clear form after submit
      setStudent({
        name: "",
        studentId: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        category: "",
        state: "",
        city: "",
        pincode: "",
        physics: "",
        chemistry: "",
        maths: "",
        total: "",
        percentage: "",
        jeeScore: "",
        cetScore: "",
        schoolName: "",
        yearOfPassing: "",
        board: "",
        address: "",
        guardianName: "",
        guardianPhone: "",
        preferredBranch: "",
        remarks: ""
      });

    } catch (err) {
      console.error("Error:", err);
      setMessage("Error saving data");
      alert("Error saving data");
    }
  };

  return (
    <div className="form-container">
      <h2>Student Master Marksheet Entry</h2>

      {/* ✅ Success / Error Message */}
      {message && (
        <p style={{ textAlign: "center", color: "green", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-grid">

        {/* BASIC DETAILS */}
        <input name="name" placeholder="Full Name" value={student.name} onChange={handleChange} required />
        <input name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={student.phone} onChange={handleChange} />

        <select className="gender" name="gender" value={student.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input type="date" name="dob" value={student.dob} onChange={handleChange} />
        <input name="category" placeholder="Category (OPEN/OBC/SC/ST)" value={student.category} onChange={handleChange} />

        {/* ADDRESS */}
        <input name="state" placeholder="State" value={student.state} onChange={handleChange} />
        <input name="city" placeholder="City" value={student.city} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" value={student.pincode} onChange={handleChange} />

        {/* MARKS */}
        <input name="physics" placeholder="Physics Marks" value={student.physics} onChange={handleChange} />
        <input name="chemistry" placeholder="Chemistry Marks" value={student.chemistry} onChange={handleChange} />
        <input name="maths" placeholder="Maths Marks" value={student.maths} onChange={handleChange} />
        <input name="total" placeholder="Total Marks" value={student.total} onChange={handleChange} />
        <input name="percentage" placeholder="Percentage" value={student.percentage} onChange={handleChange} />

        {/* ENTRANCE */}
        <input name="jeeScore" placeholder="JEE Score" value={student.jeeScore} onChange={handleChange} />
        <input name="cetScore" placeholder="MHT-CET Score" value={student.cetScore} onChange={handleChange} />

        {/* SCHOOL */}
        <input name="schoolName" placeholder="School Name" value={student.schoolName} onChange={handleChange} />
        <input name="yearOfPassing" placeholder="Year of Passing" value={student.yearOfPassing} onChange={handleChange} />
        <input name="board" placeholder="Board (CBSE/State)" value={student.board} onChange={handleChange} />

        {/* OTHER */}
        <textarea name="address" placeholder="Full Address" value={student.address} onChange={handleChange}></textarea>
        <input name="guardianName" placeholder="Guardian Name" value={student.guardianName} onChange={handleChange} />
        <input name="guardianPhone" placeholder="Guardian Phone" value={student.guardianPhone} onChange={handleChange} />

        <select className="branch" name="preferredBranch" value={student.preferredBranch} onChange={handleChange}>
          <option value="">Preferred Branch</option>
          <option>Computer Engineering</option>
          <option>Information Technology</option>
          <option>Mechanical</option>
          <option>Civil</option>
          <option>Electronics</option>
        </select>

        <textarea name="remarks" placeholder="Remarks" value={student.remarks} onChange={handleChange}></textarea>

        <button type="submit" className="submit-btn">
          Submit Data
        </button>
      </form>
    </div>
  );
}

export default StudentDetails;