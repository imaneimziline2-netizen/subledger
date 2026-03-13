import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port 3000`));