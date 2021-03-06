const checkPhone = require('./v1/checkPhone');
const { router } = require('./v1/signup');
const login = require('./v1/login');
const avatar = require('./v1/avatar');
const profile = require('./v1/profile');
const password = require('./v1/password');
const payment = require('./v1/payment');
const mollieWebhook = require('./v1/mollieWebhook');
const thankyou = require('./v1/thankyou');
const alert = require('./v1/alert');
const deviceToken = require('./v1/deviceToken');
const pickups = require('./v1/pickups');
const report = require('./v1/report');
const users = require('./v1/users');




const apiV1 = (app) => {
    app.use(`/v1/check-phone`, checkPhone);
    app.use(`/v1/signup`, router);
    app.use(`/v1/login`, login);
    app.use(`/v1/avatar`, avatar);
    app.use(`/v1/profile`, profile);
    app.use(`/v1/password`, password);
    app.use(`/v1/payment`, payment);
    app.use(`/v1/mollie-webhook`, mollieWebhook);
    app.use(`/v1/thankyou`, thankyou);
    app.use(`/v1/alert`, alert);
    app.use(`/v1/device-token`, deviceToken);
    app.use(`/v1/pickups`, pickups);
    app.use(`/v1/report`, report);
    app.use(`/v1/users`, users);
    
}

module.exports = apiV1;
