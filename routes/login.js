const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');
const { createToken } = require('./signup');



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
    const { email, password } = req.body;

    if (email && password) {
        const user = await findUser(email);
        if (user.length > 0) {
            const result = await bcrypt.compare(password, user[0].pass);
            delete user[0].pass;
            user[0].token = await createToken(user.userId);
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