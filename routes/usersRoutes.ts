import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/user/:userId", authMiddleware, (req, res) => {
  const userId = req.params.userId;

  res.send(`User ${userId}`);
});

export default router;
