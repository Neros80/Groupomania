// Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

//Constants
const TITLE_LIMITE = 1;
const ITEMS_LIMIT = 50;

// Routes
 module.exports = {
     createComs: function(req, res) {
        //Getting auth header
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        //params
        const coms = req.body.coms;

        if(coms == null) {
            return res.status(400).json({ 'error': 'missing paramters'});
        }
        if (coms.length <= TITLE_LIMITE){
            return res.status(400).json({ 'error': 'invalid parameters'});
        }
      asyncLib.waterfall([
        function(done){
            models.Post.findOne({
                where: { id: req.body.PostId }
            })
            .then (function(userFound){
                done(null, userFound);
            })
            .catch (function(err) {
                return res.status(500).json({ 'error': 'unable to very user'})
            })
        },
        function(userFound, done) {
            if(userFound) {
            models.Coms.create({
                coms : coms,
                PostId: req.body.PostId
            })
            .then(function(newComs) {
                done(newComs);
            });
        } else {
            res.status(401).json({'error': 'user not found'});
        }
    },
        ], function(newComs) {
            if(newComs) {
                return res.status(201).json(newComs);
            } else {
                return res.status(500).json({ 'error': 'connot post comment'});
            }
        })
    },
}