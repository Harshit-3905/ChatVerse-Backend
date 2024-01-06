import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";
import requireAuth from "./middleware/requireAuth.js";

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
app.use(requireAuth);
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
