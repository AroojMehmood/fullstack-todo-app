// Yeh file sirf ek kaam karti hai: MongoDB se connect karna.
// server.js isko import karke sirf ek function call karega — connectDB().

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
   
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
   
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1); // 1 = error ke sath exit (0 hota to normal exit hota)
  }
};

module.exports = connectDB;