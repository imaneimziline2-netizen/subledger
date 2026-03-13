const roleMiddleware = (role) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    next();
  };
};

export default roleMiddleware;