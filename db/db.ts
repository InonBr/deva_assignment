import mongoose from "mongoose";
require("dotenv").config();

const db = process.env.MONGO ? process.env.MONGO : "";

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    return mongoose;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }

    // exit process if cannot connect!
    process.exit(1);
  }
};

export default connectDB;
