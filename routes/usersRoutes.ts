import { Router } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";
import axios from "axios";
import { stringify } from "flatted";
import _ from "lodash";

const router = Router();

router.get("/user/:userId", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.send(user);
});

router.get("/tokens/:sortingMethod", authMiddleware, async (req, res) => {
  const sortingMethod = ["random", "name", "id"].includes(
    req.params.sortingMethod
  )
    ? req.params.sortingMethod
    : "random";

  const data = await axios.get(
    "https://ienso.ienso-dev.com/operator/tokens-list.json"
  );

  if (sortingMethod !== "random") {
    const sortedData = _.orderBy(data.data, sortingMethod);

    return res.status(200).send(stringify(sortedData));
  }

  res.send(stringify(data.data));
});

export default router;
