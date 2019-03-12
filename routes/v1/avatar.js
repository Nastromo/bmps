const express = require('express');
const router = express.Router();
const { User } = require('../../db');
const upload = require('../../utils/FileUpload');




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


const singleUpload = upload.single('photo'); // <-- This is JSON parameter to send in multipart data


router.post('/', errorHandler(async (req, res, next) => {
    singleUpload(req, res, async (err, some) => {
        if (err) {
            res.status(422).send(err.message);
        } else {
            const photo = req.file.location;
            res.json({ photo });
            try {
                await User.update({ photo }, { where: {userId: req.user.userId}});
            } catch (err) {
                console.log(err);
            }
        }
    });
})
);





module.exports = router;