import { Router } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/user/:userId", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.send(user);
});

export default router;
