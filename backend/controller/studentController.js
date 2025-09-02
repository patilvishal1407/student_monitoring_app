const db = require('../database');

exports.getAll = (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
exports.getById = (req, res) => {
  const { id } = req.params;
  db.all("SELECT * FROM students WHERE id=?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { name, email, subject, grade } = req.body;
  if (!name || name.length < 2) return res.status(400).json({ error: "Name must be at least 2 chars" });

  db.run("INSERT INTO students (name,email,subject,grade) VALUES (?,?,?,?)",
    [name, email, subject, grade],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, name, email, subject, grade });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, email, subject, grade } = req.body;

  db.run("UPDATE students SET name=?, email=?, subject=?, grade=? WHERE id=?",
    [name, email, subject, grade, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updated: this.changes });
    });
};

exports.remove = (req, res) => {
  db.run("DELETE FROM students WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};


