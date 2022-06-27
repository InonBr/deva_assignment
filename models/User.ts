import mongoose from "mongoose";

const UserFavoritesSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  company: {
    required: true,
    type: String,
  },
  favorites: {
    required: true,
    type: [UserFavoritesSchema],
  },
});

export default mongoose.model("users", UserSchema);
