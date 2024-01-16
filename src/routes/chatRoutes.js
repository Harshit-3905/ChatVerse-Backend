import express from "express";
import { allChats, newChat } from "../controllers/chatControllers.js";

const router = express.Router();
router.get("/allchats", allChats);
router.post("/newchat", newChat);

export default router;
