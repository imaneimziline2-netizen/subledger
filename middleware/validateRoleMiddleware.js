import User from "../models/userModel.js";

const validateRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (role === "admin") {
            const existingAdmin = await User.findOne({ role: "admin" });

            if (existingAdmin) {
                return res.status(403).json({
                    message: "admin déja existe.",
                });
            }
        }

        next();
    } catch (error) {
        console.log("Error on validating role.", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default validateRole;
