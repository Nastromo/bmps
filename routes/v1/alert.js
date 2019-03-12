const express = require('express');
const router = express.Router();
const { db } = require('../../db');



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


router.post('/:userId/:alertId', errorHandler(async (req, res, next) => {
    console.log(req.params.userId);
    console.log(req.params.alertId);
    res.status(200).end();
})
);



module.exports = router;