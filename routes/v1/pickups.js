const express = require('express');
const router = express.Router();
const { Pickups } = require('../../db');




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
    res.json(await Pickups.findAll({where: {userId: req.user.userId}, raw: true }));
})
);


router.post('/', errorHandler(async (req, res, next) => {
    const { pickups } = req.body;
    const user = req.user;
    const pickupsDb = await Pickups.findAll({where: {userId: user.userId}, raw: true });

    if (pickupsDb.length > 0) await Pickups.destroy({where: {userId: user.userId}});
    
    for (let i = 0; i < pickups.length; i++) {
        const pickup = { userId: user.userId, pickups: pickups[i] };
        await Pickups.create(pickup);
    }

    res.json(await Pickups.findAll({where: {userId: user.userId}, raw: true }));
})
);






module.exports = router;