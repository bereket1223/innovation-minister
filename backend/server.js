import express from 'express';
import userRoutes from './routes/user.api.js';
import departmentRoutes from './routes/department.api.js';
import connectDB from "./utils/db.js";
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);


app.listen(PORT,()=>{
  connectDB();
  console.log(`Server running at port ${PORT}`);
})

export default app;
