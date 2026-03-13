import express from "express";
import { register, login, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/athMeddelwar.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRole from "../middleware/validateRoleMiddleware.js";

const router = express.Router();

router.post("/register", validateRole,register);
router.post("/login", login);

// route admin pour lister tous les utilisateurs
router.get("/all", authMiddleware, roleMiddleware, getAllUsers);
// router.get("/all", authMiddleware, roleMiddleware("user"), getAllUsers);

export default router;
