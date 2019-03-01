const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

const s3 = new aws.S3();

const upload = multer({
    limits : { fileSize: 5 * 1024 * 1024 },
    storage: multerS3({
        s3: s3,
        bucket: 'bmps',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `ava-${Date.now().toString()}.png`)
        }
    })
})

module.exports = upload;