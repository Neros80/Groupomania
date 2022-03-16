// Imports

const express = require('express');
const userCtrl = require('./routes/userCtrl')

// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //User routes
    apiRouter.route('/user/signup/').post(userCtrl.signup),
    apiRouter.route('user/login/').post(userCtrl.login);

    return apiRouter;
})();