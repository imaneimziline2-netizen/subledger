import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Jib token men header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. Token manquant." });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    //  Vérifie token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Mets user decoded f req.user pour routes
    req.user = decoded;

    // passe au prochain mid'dleware ou route handler
    next();

  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default authMiddleware;