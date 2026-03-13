import { body, validationResult } from "express-validator";

export const validateSubscription = [
  body("name")
    .notEmpty()
    .withMessage("Le nom est requis"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Le prix doit être supérieur à 0"),
  body("billingCycle")
    .isIn(["monthly", "yearly"])
    .withMessage("billingCycle doit être 'monthly' ou 'yearly'"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];