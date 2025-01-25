const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Routes
app.get('/api/transactions', (req, res) => {
    db.query('SELECT id, description, amount FROM transactions', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/transactions', (req, res) => {
    const { description, amount } = req.body;
    db.query(
        'INSERT INTO transactions (description, amount) VALUES (?, ?)',
        [description, amount],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ status: 'success', id: result.insertId });
        }
    );
});

app.put('/api/transactions/:id', (req, res) => {
    const { id } = req.params;
    const { description, amount } = req.body;

    db.query(
        'UPDATE transactions SET description = ?, amount = ? WHERE id = ?',
        [description, amount, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.json({ status: 'success' });
        }
    );
});

app.delete('/api/transactions/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM transactions WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ status: 'success' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

