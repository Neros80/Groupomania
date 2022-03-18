const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const models = require ('../models')

//routes

modules.exports = {
    signup: function(req, res){
        const userName = req.body.userName;
        const password = req.body.password;

        if (userName == null || password == null){
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
            attributes: ['userName'],
            where: {userName: userName}
        })
        .then(function(userFound){
            if(!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword){
                    const newUser = models.User.create({
                        userName: userName,
                        password: bcryptedPassword,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'cannot add user'});
                    })

                });
            } else {
                return res.status(409).json({ 'error': 'user already existe'})
            }

        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'})
        });

    },
    login: function(req, res){
        
    }
}