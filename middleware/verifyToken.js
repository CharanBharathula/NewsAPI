const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyToken = (req, res, next)=>{
    if(req.headers && req.headers.authorization){
        const API_KEY = process.env.API_SECRET_KEY;
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, API_KEY, function(err, decodedVal){
            if(err){
                req.user = undefined;
                next();
            }
            else{
                console.log("JWT verified");
                User.findOne({
                    _id: decodedVal.id
                }).then((user)=>{
                    req.user = user;
                    next();
                }).catch(err=>{
                    return res.status(500).send(err);
                });
            }
        });
    }
    else{
        req.user = undefined;
        req.message = "Autorization headers not found";
        next();
    }
}

module.exports = verifyToken;