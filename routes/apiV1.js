const checkPhone = require('./v1/checkPhone');
const { router } = require('./v1/signup');
const login = require('./v1/login');
const avatar = require('./v1/avatar');
const profile = require('./v1/profile');


const apiV1 = (app) => {
    app.use(`/v1/check-phone`, checkPhone);
    app.use(`/v1/signup`, router);
    app.use(`/v1/login`, login);
    app.use(`/v1/avatar`, avatar);
    app.use(`/v1/profile`, profile);
}

module.exports = apiV1;