import { Router } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";
import axios from "axios";
import { stringify } from "flatted";
import _ from "lodash";
import dtoValidationMiddleware from "../middleware/dtoValidationMiddleware";
import { FavoritesDto } from "./DTO/favoritesDto";

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

router.get("/user/:userId/favorites", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.send(user.favorites);
});

router.post(
  "/user/:userId/favorites",
  authMiddleware,
  dtoValidationMiddleware(FavoritesDto),
  async (req, res) => {
    const userId = req.params.userId;
    const newFavoritesEntry: FavoritesDto = req.body;

    const user = await User.findById(userId);

    await User.findByIdAndUpdate(userId, {
      favorites: [...user.favorites, newFavoritesEntry],
    });

    res.status(201).send(newFavoritesEntry);
  }
);

router.delete(
  "/user/:userId/favorites/:favoriteId",
  authMiddleware,
  async (req, res) => {
    const userId = req.params.userId;
    const favoriteId = req.params.favoriteId;

    const user = await User.findById(userId);

    const newFavorites = user.favorites.filter(
      (favorite: { _id: any; name: string; price: number }) =>
        favorite._id.toHexString() !== favoriteId
    );

    await User.findByIdAndUpdate(userId, { favorites: newFavorites });

    res.status(200).send();
  }
);

export default router;
