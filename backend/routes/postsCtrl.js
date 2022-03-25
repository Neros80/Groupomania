// Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

//Constants
const TITLE_LIMITE = 2;
const POST_LIMITE = 4;
const ITEMS_LIMIT = 50;

// Routes
 module.exports = {
     createPost: function(req, res) {
        //Getting auth header
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        //params
        const title = req.body.title;
        const messages = req.body.messages;
        const comment = req.body.comment;

        if(title == null || messages == null) {
            return res.status(400).json({ 'error': 'missing paramters'});
        }
        if (title.length <= TITLE_LIMITE || messages.length <= POST_LIMITE){
            return res.status(400).json({ 'error': 'invalid parameters'});
        }
      asyncLib.waterfall([
        function(done){
            models.User.findOne({
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
            models.Post.create({
                title : title,
                messages : messages,
                comment: comment,
                UserId: userFound.id
            })
            .then(function(newPost) {
                done(newPost);
            });
        } else {
            res.status(401).json({'error': 'user not found'});
        }
    },
        ], function(newPost) {
            if(newPost) {
                return res.status(201).json(newPost);
            } else {
                return res.status(500).json({ 'error': 'connot post message'});
            }
        })
    },
     listPost: function(req, res){
        const fields = req.query.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offet);
        const order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
          }

        models.Post.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ]
            }]
        }).then (function(messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(401).json({ 'error' : 'no message found'});
            }
        }).catch (function(err) {
            console.log(err);
            res.status(500).json({"error": "invalid fields"})
        })

} 
}