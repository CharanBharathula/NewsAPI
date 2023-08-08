const express = require('express');
const bodyParser = require('body-parser');
const newsInfo = require('./controller/newsInfo.js');
const {signUp, signIn} = require('./controller/authController.js');
const routes = express.Router();
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(routes);

app.get('/', (req, res)=>{
    return res.status(200).send("Welcome to News API");
});

app.listen(4000, (error)=>{
    if(error){
        console.log("Error occured");
    }
    else{
        console.log("Sever Successfully launched");
    }
});

app.post('/register', signUp);
app.post('/login', signIn);

routes.use('/newsInfo', newsInfo);