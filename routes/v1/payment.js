const express = require('express');
const router = express.Router();
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


router.get('/:sum', errorHandler(async (req, res, next) => {
    const payment = await createPayment(req.user.userId, req.params.sum);
    res.json({url: payment.getPaymentUrl()});
})
);




const createPayment = async (userId, sum) => {
    return await mollie.payments.create({
        amount: { value: `${sum}`, currency: `USD` },
        description: `www.bemypass.com`,
        redirectUrl: `https://api.bemypass.com/v1/thankyou`,
        webhookUrl: `https://api.bemypass.com/v1/mollie-webhook`,
        metadata: { userId }
    });
}




module.exports = router;