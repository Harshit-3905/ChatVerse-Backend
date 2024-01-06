import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "Authorization Token Required" });
  const token = authorization.replace("Bearer ", "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: id });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export default requireAuth;
