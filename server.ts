import express from "express";
import cors from "cors";
import connectDB from "./db/db";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
