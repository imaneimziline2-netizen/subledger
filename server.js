const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("server dans la port 3000");
});

const userRout = require('./routes/userRoutes');
const subscriptionRout = require('./routes/subscriptionRoutes');
const adminRout = require('./routes/adminRoutes');

