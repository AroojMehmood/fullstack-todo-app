// Entry point — server yahan se start hota hai.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

// App start hone se pehle MongoDB se connect karo
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins — local dev + deployed frontend (env se aata hai)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Postman/curl jaise tools se aane wale requests (no origin) allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Todo API is running...");
});


app.use("/api/auth", authRoutes);


app.use("/api/todos", todoRoutes);

// 404 handler 
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});