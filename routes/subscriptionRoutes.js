// src/routes/subscriptionRoutes.js
import express from "express";
import authMiddleware from "../middleware/athMeddelwar.js";
import {
  createSubscription,
  getSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription
} from "../controllers/subscriptionController.js";

const router = express.Router();

// CREATE subscription
router.post("/", authMiddleware, createSubscription);

// GET all subscriptions (user connected)
router.get("/", authMiddleware, getSubscriptions);

// GET one subscription
router.get("/:id", authMiddleware, getSubscription);

// UPDATE subscription
router.put("/:id", authMiddleware, updateSubscription);

// DELETE subscription
router.delete("/:id", authMiddleware, deleteSubscription);

export default router;