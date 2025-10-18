import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/db.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server Up!");
});
