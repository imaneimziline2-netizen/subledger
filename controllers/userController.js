import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { json } from "express";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        console.log(user);

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "password inncorect" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECREt,
            {
                expiresIn: "1D",
            },
        );
        res.status(200).json({ message: "login success", token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const register = () => {};
