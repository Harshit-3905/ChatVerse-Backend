import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

const allChats = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const chats = user.chats;
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newChat = async (req, res) => {
  try {
    const user1 = req.user;
    const { participant } = req.body;
    const user2 = await User.findOne({ email: participant });
    const existingChat = await Chat.findOne({
      participant: { $all: [user1._id, user2._id] },
    });
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    const chat = await Chat.create({ participant: [user1, user2] });
    await user1.chats.push(chat);
    await user2.chats.push(chat);
    await user1.save();
    await user2.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { allChats, newChat };
