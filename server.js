import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

app.listen(3000, () => {
    connectDB();
    console.log("server dans la port 3000");
});
