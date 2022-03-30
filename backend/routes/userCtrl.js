const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const { verify } = require('jsonwebtoken');

//regex
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

//routes

module.exports = {
    signup: function (req, res) {
        const userName = req.body.userName;
        const password = req.body.password;

        if (userName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (userName.length >= 13 || userName.length <= 4) {
            return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12' });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'password invalid(must be length 4-8 include 1 number at least' })
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    attributes: ['userName'],
                    where: { userName: userName }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    })
                } else {
                    return res.stauts(409).json({ 'error': 'user already exist' });
                }
            },
            function (userFound, bcryptedPassword, done) {
                const newUser = models.User.create({
                    userName: userName,
                    password: bcryptedPassword,
                    isAdmin: 0
                })
                    .then(function (newUser) {
                        done(newUser);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
            }
        ], function (newUser) {
            if (newUser) {
                return res.status(200).json({
                    'userId': newUser.id
                });
            } else {
                return res.status(404).json({ 'error': 'cannot add user' });
            }
        });

    },

    login: function (req, res) {

        // Params
        var userName = req.body.userName;
        var password = req.body.password;

        if (userName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: { userName: userName }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'user not exist in DB' });
                }
            },
            function (userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            }
        ], function (userFound) {
            if (userFound) {
                return res.status(201).json({
                    'user': userFound,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        });
    },

    getAllUsers: function (req, res) {
        models.User.findAll()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err))
    },
    deleteUser: function(req, res){
        console.log(req.body);
        models.User.findOne({
            where: { id: req.body.userId }
        })
        .then((user) => user.destroy().then(() => res.status(200).json({
            message: "user deleted"
        })))
        .catch((err) => res.status(500).json(err))
    }
}




