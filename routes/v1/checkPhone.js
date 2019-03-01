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


router.post('/', errorHandler(async (req, res, next) => {
    const { phoneNumber } = req.body;
    
    if (phoneNumber) {
        res.json(await checkPhone(phoneNumber));
    } else {
        res.status(400).send(`Phone number is required`);
    }

})
);


const checkPhone = async (phoneNumber) => {
    const number = await db.query(
        `
        SELECT
            *
        FROM
            users
        WHERE
            phoneNumber = '${phoneNumber}';
        `,
        { type: db.QueryTypes.SELECT }
    );
    if (number.length > 0) return {isExist: true};
    else return {isExist: false};
}


module.exports = router;