// Imports

const express = require('express');
const userCtrl = require('./routes/userCtrl')

// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //User routes
    apiRouter.route('/users/signup/').post(userCtrl.signup),
    apiRouter.route('/users/login/').post(userCtrl.login);

    return apiRouter;
})();