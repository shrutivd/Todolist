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
    console.info("Connected to MongoDB");
    db = client.db("Todolist"); 
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Endpoint to handle POST requests
app.post("/register", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const result = await db.collection("tasks").insertOne({ title, description, priority });
    res.status(201).json({ message: "Data saved successfully", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

//Endpoint to handle GET requests
  app.get("/register", async(req, res) => {
    try{
  const allTasks = await db.collection("tasks").find().toArray();
  res.status(200).json({message: "Data fetched succesfully", allTasks});

    }catch(error){
      res.status(500).json({error: "Failed to fetch the data"})
    }
})

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
