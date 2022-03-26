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
                where: { id: userId }
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
                UserId: userFound.id
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
     listComs: function(req, res){
        const fields = req.query.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offet);
        const order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
          }

        models.Coms.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.Post,
                attributes: [ 'message' ]
            }]
        }).then (function(coms) {
            if (coms) {
                res.status(200).json(coms);
            } else {
                res.status(401).json({ 'error' : 'no message found'});
            }
        }).catch (function(err) {
            console.log(err);
            res.status(500).json({"error": "invalid fields"})
        })

} 
}