A simple full-stack student management system built with:
Frontend: React + Material-UI (MUI)
Backend: Node.js + Express.js
Database: SQLite (lightweight, file-based database)



-Features
Add new students with validation:
Name (min 2 characters, required)
Email (valid, unique, required)
Subject (required, only from [Math, Science, English, History])
Grade (0–100 only)
List all students with search and filter options

Analytics dashboard:
Total students
Average grade per subject
Recent student additions


student-management/
│
├── backend/
│   ├── server.js          # Express entry point
│   ├── db.js              # SQLite connection & setup
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── controllers/
│   │   └── studentController.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js
│   │   │   ├── StudentList.js
│   │   │   └── Analytics.js
│   │   ├── utils/api.js   # Axios wrapper
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── electron/
│   ├── main.js
│   └── package.json
│
└── README.md


⚙️ Installation & Setup


1. Clone the repo
https://github.com/patilvishal1407/student_monitoring_app.git


2. Backend Setup
cd backend
npm install

Run the backend: node server.js
Backend will start at: http://localhost:5005

SQLite DB file will be created automatically as students.db.

3. Frontend Setup
cd frontend
npm install

Run the frontend: npm start
Frontend will start at: http://localhost:3000


4. Frontend Setup
cd electron
npm start

Electron Window Will open . 

to log in :-
userid = teacher
password = password123
