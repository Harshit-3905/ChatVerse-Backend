import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
