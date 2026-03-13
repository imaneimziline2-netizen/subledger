import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // vérifier si email déjà existant
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email déjà utilisé" });

        // hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

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

        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({ message: "login success", token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// get all users (Admin seulement)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        // ne retourne pas les mots de passe
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
