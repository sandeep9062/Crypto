import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import coinRoutes from "./routes/coinRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());

// ✅ Proper CORS configuration for Netlify frontend
// app.use(cors({
//   origin: 'https://anuradha-priny.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.options('*', cors({
//   origin: 'https://anuradha-priny.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.get("/", (req, res) => {
  res.send(`Welcome to port ${PORT}`);
});

// API routes
app.use("/api/auth", authRoutes);

app.use("/api", coinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
