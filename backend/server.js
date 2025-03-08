import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.api.js';
import departmentRoutes from './routes/department.api.js';
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploads directory accessible
app.use("/uploads", express.static("uploads"))

// Routes
app.use('/api/user', userRoutes);
app.use('/api/department', departmentRoutes);

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

