const express = require('express');
const router = express.Router();
const { Review } = require('../../db');


const { sendThanksFeedback, sendThanksQuestion } = require('../../utils/Mailjet');


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
    const { review, isFeedbackSent } = req.body;

    if (review && req.user.email) {
        await Review.create({
            ...review,
            userId: req.user.userId
        });
        await sendThanksFeedback(req.user.email, req.user.firstName);
    }
    else if (isFeedbackSent && req.user.email) await sendThanksQuestion(req.user.email, req.user.firstName);
    res.status(200).end();
})
);



module.exports = router;