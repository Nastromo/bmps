const express = require('express');
const router = express.Router();
const { User } = require('../../db');




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

router.get('/', errorHandler(async (req, res, next) => {
    const { offset, limit } = req.query;
    const users = await User.findAll({ offset: Number(offset), limit: Number(limit) });
    for (let i = 0; i < users.length; i++) {
        delete users[i].pass;
    }
    res.json(users);
})
);



module.exports = router;