const express = require('express');
const router = express.Router();
const { Payment } = require('../../db');
const mollie = require("@mollie/api-client")({
    apiKey: process.env.MOLLIE_KEY,
});



const errorHandler = reqHandler => {
    return async (req, res, next) => {
        try {
            await reqHandler(req, res, next)
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}



router.post('/', errorHandler(async (req, res, next) => {
    const payment = await mollie.payments.get(req.body.id);
    
    const userId = payment.metadata.userId;
    const paymentId = payment.id;
    const paymentStatus = payment.status;
    const createdAt = payment.createdAt;
    const amount = payment.amount.value;
    const currency = payment.amount.currency;
    
    Payment.create({ userId, paymentId, paymentStatus, createdAt, amount, currency });
    res.status(200).end();
})
);



module.exports = router;