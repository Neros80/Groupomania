const bcrypt = require('bcrypt');
const models = require('../models')
const jwtUtils = require('../utils/jwt.utils')

//routes

module.exports = {
    signup: function (req, res) {
        const userName = req.body.userName;
        const password = req.body.password;

        if (userName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
            attributes: ['userName'],
            where: { userName: userName }
        })
            .then(function (userFound) {
                if (!userFound) {

                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        const newUser = models.User.create({
                            userName: userName,
                            password: bcryptedPassword,
                            isAdmin: 0
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch(function (err) {
                                return res.status(500).json({ 'error': 'cannot add user' });
                            });

                    });
                } else {
                    return res.status(409).json({ 'error': 'user already existe' })
                }

            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' })
            });

    },
    login: function (req, res) {
        //params
        const userName = req.body.userName;
        const password = req.body.password;
        if (userName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            where: { userName: userName }
        })
        .then(function(userFound){
            if(userFound){
                bcrypt.compare(password, userFound.password, function(errBycrypt, resbcrypt){
                    if(resbcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else{
                        return res.status(403).json({ "error": "invalid password"});
                    }
                })

            }else{
                return res.status(404).json({ 'error': 'user not exist in DB'});
            }

        })
        .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' })
        });
    }
};