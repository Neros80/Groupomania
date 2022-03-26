// Imports

const express = require('express');
const userCtrl = require('./routes/userCtrl')
const postCtrl = require('./routes/postsCtrl')
const comsCtrl = require('./routes/comsCtrl')


// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //User routes
    apiRouter.route('/users/signup/').post(userCtrl.signup);
    apiRouter.route('/users/login/').post(userCtrl.login);
    apiRouter.route('/users/me/').get(userCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(userCtrl.updateUserProfile);

    //message routes
    apiRouter.route('/post/new').post(postCtrl.createPost);
    apiRouter.route('/post/').get(postCtrl.listPost);  

    //commentaire routes
    apiRouter.route('/coms/new').post(comsCtrl.createComs);
    return apiRouter;
})();
