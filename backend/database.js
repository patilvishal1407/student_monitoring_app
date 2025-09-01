const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite3', (err) => {
  if (err) console.error('DB connection error:', err);
  else console.log('Connected to SQLite');
});



db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL CHECK(subject IN ('Math','Science','English','History')),
    grade INTEGER NOT NULL CHECK(grade BETWEEN 0 AND 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
