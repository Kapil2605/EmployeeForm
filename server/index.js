import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./db.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
Connection(mongoURI);

const employeeSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: String,
  address: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

// Routes
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
