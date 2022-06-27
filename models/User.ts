import mongoose from "mongoose";

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
    type: Array,
  },
});

export default mongoose.model("users", UserSchema);
