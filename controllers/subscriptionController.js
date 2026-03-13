import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {

    const { name, price, billingCycle,userId } = req.body;

    if (price <= 0) {
      return res.status(400).json({ message: "Le prix doit être > 0" });
    }

    const subscription = new Subscription({
      name,
      price,
      billingCycle,
      userId: userId
    });

    await subscription.save();

    res.status(201).json(subscription);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSubscriptions = async (req, res) => {

  const subscriptions = await Subscription.find({ userId: req.user.id });

  res.json(subscriptions);

};


export const getSubscription = async (req, res) => {

  const subscription = await Subscription.findById(req.params.id);

  res.json(subscription);

};


export const updateSubscription = async (req, res) => {

  const updated = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);

};


export const deleteSubscription = async (req, res) => {

  await Subscription.findByIdAndDelete(req.params.id);

  res.json({ message: "Subscription deleted" });

};