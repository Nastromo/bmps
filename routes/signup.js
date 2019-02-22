const express = require('express');
const router = express.Router();



const errorHandler = reqHandlar => {
    return async (req, res, next) => {
        try {
            await reqHandlar(req, res, next)
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}




router.post('/', errorHandler(async (req, res, next) => {
    res.json(`Hello BeMyPass iOS Developer!`);
})
);




router.get('/', errorHandler(async (req, res, next) => {
    res.send(`Hello BeMyPass iOS Developer!`);
})
);


module.exports = router;