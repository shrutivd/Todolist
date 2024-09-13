// server.js
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//const port = process.env.PORT;
const port = 5000;
//const uri = process.env.MONGO_URI;
const uri = "mongodb+srv://svd:saurabh123@cluster0.b2xzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("Todolist"); // Replace with your actual database name
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Endpoint to handle POST requests
app.post("/register", async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await db.collection("tasks").insertOne({ title, description });
    res.status(201).json({ message: "Data saved successfully", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
