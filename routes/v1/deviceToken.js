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


router.post('/', errorHandler(async (req, res, next) => {
    const { deviceToken } = req.body;
    await User.update({ deviceToken }, { where: {userId: req.user.userId}});
    res.status(200).end();
})
);



module.exports = router;