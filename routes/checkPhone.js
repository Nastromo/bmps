const express = require('express');
const router = express.Router();
const { db } = require('../db');



const errorHandler = reqHandlar => {
    return async (req, res, next) => {
        try {
            await reqHandlar(req, res, next)
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}


router.post('/', errorHandler(async (req, res, next) => {
    

})
);


const findUser = async (email) => {
    const user = await db.query(
        `
        SELECT
            *
        FROM
            users
        WHERE
            email = '${email}';

        `,
        { type: db.QueryTypes.SELECT }
    );
    return user;
}


module.exports = router;