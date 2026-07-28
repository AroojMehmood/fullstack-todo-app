// Entry point — server yahan se start hota hai.

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());            // Frontend (different port) se requests allow karne ke liye
app.use(express.json());    // Incoming JSON body ko parse karne ke liye (req.body)

// Health check route — sirf yeh confirm karne ke liye ke server chal raha hai
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Todo routes — sab /api/todos se shuru honge
app.use("/api/todos", todoRoutes);

// 404 handler — jo route exist nahi karta uske liye
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler — kisi bhi unexpected error ko yahan catch karega
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
