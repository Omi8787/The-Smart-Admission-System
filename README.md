# 🎓 Smart Admission Eligibility & Branch Recommendation System

A web-based application that helps students check their eligibility for engineering branches based on their academic performance and entrance exam scores. The system uses React for the frontend, Python Flask for the backend, Oracle Database for data storage, and Prolog for rule-based eligibility checking.

---

## 📌 Project Overview

The Smart Admission Eligibility & Branch Recommendation System allows students to:

- Register and store their academic details.
- View saved student records.
- Check eligibility for different engineering branches.
- Receive branch recommendations based on predefined Prolog rules.

This project combines modern web technologies with Artificial Intelligence concepts using Prolog.

---

## 🚀 Features

- 📝 Student Registration Form
- 📋 View Student Records
- 🎯 Branch Eligibility Checking
- 🤖 Rule-Based Decision Making using Prolog
- 💾 Oracle Database Integration
- 🌐 Responsive React Frontend
- 🔄 REST API using Flask

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Python
- Flask
- Flask-CORS

### Database
- Oracle Database 11g XE

### AI / Logic Programming
- SWI-Prolog
- PySWIP

---

## 📂 Project Structure

```
Paradigm_Project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── eligibility.pl
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Omi8787/The-Smart-Admission-System.git
```

Go into the project folder:

```bash
cd The-Smart-Admission-System
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend Setup

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start Flask server:

```bash
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

## Database Configuration

Install:

- Oracle Database 11g XE
- Oracle Instant Client

Update Oracle connection details in your backend:

```python
username = "your_username"
password = "your_password"
dsn = "localhost/XE"
```

---

## How It Works

1. Student enters academic details.
2. Data is stored in Oracle Database.
3. Student data is fetched by the backend.
4. Prolog evaluates eligibility rules.
5. The recommended engineering branch is displayed.

---

## Screenshots

### Home Page

<img width="1365" height="907" alt="Screenshot 2026-07-01 135536" src="https://github.com/user-attachments/assets/7c718155-5cdb-46b8-8803-061ff9fcf216" />

### Student Registration

<img width="1100" height="700" alt="Screenshot 2026-07-01 135702" src="https://github.com/user-attachments/assets/b40cf451-27c8-471c-8529-5af5138ef36c" />


### Eligibility Result

<img width="1067" height="727" alt="Screenshot 2026-07-01 140023" src="https://github.com/user-attachments/assets/b7b32613-5fe7-485f-9db6-c372df839406" />
<img width="1000" height="900" alt="Screenshot 2026-07-01 140147" src="https://github.com/user-attachments/assets/7a44ec21-4f7d-458e-9357-ae476755a934" />


---

## Future Enhancements

- User Authentication
- Admin Dashboard
- College-wise Cutoff Prediction
- PDF Report Generation
- Email Notifications
- Cloud Database Support
- Full Online Deployment

---

## Live Demo

Frontend:

https://omi8787.github.io/The-Smart-Admission-System/

---

## Author

**Omkar Tandalekar**

Bachelor of Engineering (B.E.)

GitHub:
https://github.com/Omi8787

---

## License

This project is created for educational and academic purposes.
