const express = require('express');
const router = express.Router();
const { Payment } = require('../../db');



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
    res.status(200).end();
    const userId = req.body.metadata.userId;
    const paymentId = req.body.id;
    const paymentStatus = req.body.status;
    const createdAt = req.body.createdAt;
    const amount = req.body.amount.value;
    const currency = req.body.amount.currency;
    Payment.create({ userId, paymentId, paymentStatus, createdAt, amount, currency });
})
);



module.exports = router;