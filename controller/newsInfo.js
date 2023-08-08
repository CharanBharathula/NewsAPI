const express = require('express');
const bodyParser = require('body-parser');
const URLSearchParams = require('url-search-params');
const routes = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const newsPromise = require('./newsInfoHelper.js');
const User = require('../model/User.js');

let url = 'https://newsapi.org/v2/top-headlines';

routes.use(bodyParser.json());

routes.get('/preferences', verifyToken, (req, res)=>{
    const currentUser = req.user;
    if(!currentUser){
        return res.status(500).send({message:"Invalid user"});
    }
    return res.status(200).send({preferencres: currentUser.preferences});
})

routes.get('/news', verifyToken, (req, res)=>{
    if(!req.user && req.message){
        //autorization headers not found
        return res.status(403).send({
            message: req.message
        });
    }
    if(!req.user && req.message == null){
        return res.status(401).send({
            message:"Invalid jwt token"
        });
    }
    const userPreferences = req.user.preferences;
    const searchParams = new URLSearchParams({ category: userPreferences });
    const API_KEY = process.env.API_SECRET_KEY; // Replace with your API key
    const newsApiUrl = `${url}?${searchParams}&apiKey=${API_KEY}`;
    newsPromise(newsApiUrl).then((response) => {
        return res.status(200).send(response);
    }).catch(error => {
        return res.status(500).send("Some error");
    });
});

routes.put('/preferences', verifyToken, async (req, res)=>{
    try {
        if(!req.user){
            return res.status(401).send({
                message: "Invalid token"
            });
        }
        const userId = req.user.id;
        const newPreferences = req.body.preferences;
        const updatedUser = await User.findByIdAndUpdate({_id:userId}, {preferences: newPreferences});
        
        return res.status(200).send({
            message: "Preferences updated successfully",
            preferences: newPreferences
        });
        
    } catch (error) {
        return res.status(500).send("Error updating preferences");        
    }
});

module.exports = routes;