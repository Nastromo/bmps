const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../../db');
const { createToken } = require('./signup');



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
    const { phoneNumber, password } = req.body;
    if (phoneNumber && password) {
        const user = await findUser(phoneNumber);
        if (user.length > 0) {
            const result = await bcrypt.compare(password, user[0].pass);
            delete user[0].pass;
            user[0].token = await createToken(user[0].userId);
            if (result) res.json(user[0])
            else res.status(403).send(`Credentials are wrong`);
        } else {
            res.status(400).send(`No such user`);
        }
    } else {
        res.status(400).send(`Login and password are required`);
    }

})
);


const findUser = async (phoneNumber) => {
    const user = await db.query(
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
    return user;
}


module.exports = router;