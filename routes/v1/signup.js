const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const { User } = require('../../db');
const jwt = require('jsonwebtoken');



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
    const { password, phoneNumber } = req.body;

    if (password && phoneNumber) {
        const user = await createUser(req);
        if (user.isNew) {
            delete user.pass;
            user.token = await createToken(user.userId);
            res.json(user);
        } else {
            res.status(409).send(`User already exist`);
        }
    } else {
        res.status(400).send(`Phone and password are required`);
    }

})
);


router.get('/', errorHandler(async (req, res, next) => {
    res.status(200).send(`This is BeMyPass API! It's alive and running`);
})
);


const createToken = (userId) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId }, process.env.SECRET_KEY, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });
}


const createUser = async (req) => {
    const { userType, password, phoneNumber, firstName, lastName, email } = req.body;
    const user = await User.findOrCreate({
        where: { phoneNumber },
        defaults: {
            userId: uuidv4(),
            photo: null,
            pass: await bcrypt.hash(password, 8),
            regDate: new Date().getTime(),
            userType,
            phoneNumber,
            firstName,
            lastName,
            email
        }
    }).spread((data, isNew) => {
        let user = data.get({ plain: true });
        user.isNew = isNew;
        return user;
    });
    return user;
}


module.exports = {
    router,
    createToken
};