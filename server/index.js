import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let db;
connectDB().then(connection => {
  db = connection;
}).catch(error => {
  console.error('MySQL connection error:', error);
});

// Routes
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/employees', async (req, res) => {
  const { fname, lname, email, phone, address } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO employees (fname, lname, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [fname, lname, email, phone, address]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
