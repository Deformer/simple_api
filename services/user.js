const User = require('../models/user');
const assert = require('assert');

exports.createNewUser = (req,res) => {
    let user = new User(req.body);
    user.save( err => {
        if(err){
            res.status(500).send(err);
            console.error(err);
        }
        else res.status(200).send('User was created successful');
    });
};


exports.checkUserExistence = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne( {email: email}, (err,user) =>{
        if(err) res.status(500).send(err);
        else if(!user) res.send(404).send("wrong combination of login and password");
        else{
            let correctPassword = user.checkPassword(password);
            if(!correctPassword) res.send(404).send("wrong combination of login and password");
            else res.status(200).send(user);
        }
    });
};
