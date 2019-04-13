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
    const user = await User.findOne({ where: { userId: req.user.userId }, raw: true });
    delete user.pass;
    res.json(user);
})
);


router.post('/', errorHandler(async (req, res, next) => {
    const { email, userType, firstName, lastName } = req.body;
    await User.update({ email, userType, firstName, lastName }, { where: { userId: req.user.userId } });
    res.json({ email, userType, firstName, lastName });
})
);


router.delete('/', errorHandler(async (req, res, next) => {
    await User.destroy({ where: { userId: req.user.userId } });
    res.status(200).end();
})
);


module.exports = router;