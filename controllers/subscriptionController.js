// src/controllers/subscriptionController.js
import Subscription from "../models/Subscription.js";

// CREATE subscription
export const createSubscription = async (req, res) => {
  try {
    const { name, price, billingCycle } = req.body;

    if (!name || !price || !billingCycle) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Le prix doit être > 0" });
    }

    const subscription = new Subscription({
      name,
      price,
      billingCycle,
      userId: req.user.id, 
      // userId from token
    });

    await subscription.save();
    res.status(201).json(subscription);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all subscriptions for connected user
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user.id });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single subscription
export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription non trouvée" });

    if (subscription.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès refusé" });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE subscription
export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription non trouvée" });

    if (subscription.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès refusé" });

    const { name, price, billingCycle } = req.body;
    if (name) subscription.name = name;
    if (price) {
      if (price <= 0) return res.status(400).json({ message: "Le prix doit être > 0" });
      subscription.price = price;
    }
    if (billingCycle) subscription.billingCycle = billingCycle;

    await subscription.save();
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE subscription
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription non trouvée" });

    if (subscription.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès refusé" });

    await subscription.deleteOne();
    res.json({ message: "Subscription supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};