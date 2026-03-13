const roleMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    console.log(req.user);

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
    }

    next();
};

export default roleMiddleware;
