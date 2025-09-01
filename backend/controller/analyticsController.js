const db = require('../database');

exports.analytics = (req, res) => {
    db.all("SELECT subject, AVG(grade) as avgGrade FROM students GROUP BY subject", [], (err, averages) => {
        if (err) return res.status(500).json({ error: err.message });

        db.get("SELECT COUNT(*) as total FROM students", [], (err, countRow) => {
            db.all("SELECT * FROM students ORDER BY created_at DESC LIMIT 5", [], (err, recent) => {
                res.json({ total: countRow.total, averages, recent });
            });
        });
    });
};

