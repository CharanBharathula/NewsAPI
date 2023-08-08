const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const User = require('../model/User.js');

//console.log(process.env.API_SECRET_KEY);
var signUp = (req, res)=>{
    let fullName = req.body.fullName;
    let email = req.body.email;
    let pwd = bCrypt.hashSync(req.body.password, 10);
    let preferences = req.body.preferences;
    const user = new User({
        fullName: fullName,
        email: email,
        password: pwd,
        preferences: preferences
    });

    user.save().then(data=>{
        return res.status(200).json(data);
    }).catch(error=>{
        return res.status(500).send("User signup failed");
    });
}

var signIn = (req, res)=>{
    let email = req.body.email;
    let pwd = req.body.password;

    User.findOne({email: email}).then((user)=>{
        var isPwdValid = bCrypt.compareSync(pwd, user.password);
        if(!isPwdValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            });
        }
        var token = jwt.sign({id: user.id},  process.env.API_SECRET_KEY, {expiresIn: "24h"});
        return res.status(200).send(
        {
            user: {
                user: user.id,
                email: user.email,
                fullName: user.fullName
            },
            message: "Login Successfully",
            accessToken: token
        });
    }).catch(error=>{
        return res.status(400).send("User doesn't exist");
    });
}

module.exports = {signUp, signIn};