import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.api.js';
import departmentRoutes from './routes/department.api.js';
import cookieParser from "cookie-parser"
import sheetOneRoutes from "./routes/sheetOne.api.js"
import sheetTwoRoutes from "./routes/sheetTwo.api.js"

dotenv.config();
const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

connectDB();

// Configure CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Add your frontend URL
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploads directory accessible
app.use("/uploads", express.static("uploads"))

// Routes
app.use('/api/user', userRoutes);
app.use('/api/department', departmentRoutes);
app.use("/api/sheet-one", sheetOneRoutes)
app.use("/api/sheet-two", sheetTwoRoutes)


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;

