const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Connect to MongoDB using mongoose
mongoose.connect(
    "mongodb+srv://sanjhvii:Saidrsafam30.@cluster0.nxcgut7.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});