const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const { verify } = require('jsonwebtoken');

//regex
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

//routes

module.exports = {
    signup: function (req, res) {
        const userName = req.body.userName;
        const password = req.body.password;

        if (userName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (userName.length >= 13 || userName.length <= 4 ){
            return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12'});
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'password invalid(must be length 4-8 include 1 number at least'})
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['userName'],
                    where: { userName: userName }
                })
            .then(function (userFound) {
                    done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });
            },
            function(userFound, done) {
                if(!userFound) {
                    bcrypt.hash(password, 5, function(err,bcryptedPassword){
                        done(null, userFound, bcryptedPassword);
                    })
                } else {
                    return res.stauts(409).json({ 'error' : 'user already exist' });
                }
            },
            function(userFound, bcryptedPassword, done) {
                const newUser = models.User.create({
                    userName: userName,
                    password: bcryptedPassword,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err){
                    return res.status(500).json({ 'error' : 'cannot add user'});
                });
            }
        ], function(newUser) {
            if (newUser) {
                return res.status(200).json({
                    'userId': newUser.id
                });
            } else {
                return res.status(404).json({ 'error': 'cannot add user'});
            }
        });

    //     models.User.findOne({
    //         attributes: ['userName'],
    //         where: { userName: userName }
    //     })
    //         .then(function (userFound) {
    //             if (!userFound) {

    //                 bcrypt.hash(password, 5, function (err, bcryptedPassword) {
    //                     const newUser = models.User.create({
    //                         userName: userName,
    //                         password: bcryptedPassword,
    //                         isAdmin: 0
    //                     })
    //                         .then(function (newUser) {
    //                             return res.status(201).json({
    //                                 'userId': newUser.id
    //                             })
    //                         })
    //                         .catch(function (err) {
    //                             return res.status(500).json({ 'error': 'cannot add user' });
    //                         });

    //                 });
    //             } else {
    //                 return res.status(409).json({ 'error': 'user already existe' })
    //             }

    //         })
    //         .catch(function (err) {
    //             return res.status(500).json({ 'error': 'unable to verify user' })
    //         });

    },
//     login: function (req, res) {
//         //params
//         const userName = req.body.userName;
//         const password = req.body.password;
//         if (userName == null || password == null) {
//             return res.status(400).json({ 'error': 'missing parameters' });
//         }
//         models.User.findOne({
//             where: { userName: userName }
//         })
//         .then(function(userFound){
//             if(userFound){
//                 bcrypt.compare(password, userFound.password, function(errBycrypt, resbcrypt){
//                     if(resbcrypt) {
//                         return res.status(200).json({
//                             'userId': userFound.id,
//                             'token': jwtUtils.generateTokenForUser(userFound)
//                         });
//                     }else{
//                         return res.status(403).json({ "error": "invalid password"});
//                     }
//                 })

//             }else{
//                 return res.status(404).json({ 'error': 'user not exist in DB'});
//             }

//         })
//         .catch(function (err) {
//             return res.status(500).json({ 'error': 'unable to verify user' })
//         });
//     }
// };
login: function(req, res) {
    
    // Params
    var userName = req.body.userName;
    var password = req.body.password;

    if (userName == null ||  password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }
    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { userName: userName }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
},
    getUserProfile: function(req, res) {
        //Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'});

        models.User.findOne({
            attributes: ['id', 'userName'],
            where: {id: userId}
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found'});
            }
        }).catch(function(err){
            res.status(500).json({ 'error': 'cannot fetch user'});
        });
    },
    updateUserProfile: function(req, res) {
        //getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //params
        const userName = req.body.userName;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'userName'],
                    where: { id: userId}
                }).then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.stauts(500).json({ 'error': 'unable to verify user'});
                });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        userName: (userName ? userName : userFound.userName)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({'error': 'cannot update user'})
                    });
                }
            }
        ])
    }
};