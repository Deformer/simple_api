const User = require('../models/user');
const assert = require('assert');

exports.createNewUser = (userObj,cb) => {
    assert.equal(typeof cb, 'function',
    "callback should be a function");
    let user = new User(userObj);
    user.save( err => {
        if(err){
            console.error(err);
            cb(err);
        }
        else cb(null);
    });
};

exports.checckUserExistance = (email, password, cb) => {
    assert.equal(typeof cb, 'function',
        "callback should be a function");
    User.findOne( {email: email}, (err,user) =>{
        if(err) cb(err);
        else if(!user) cb(null,null);
        else{
            let correctPassword = user.checkPassword(password);
            if(!correctPassword) cb(null,null);
            else cb(null,user)
        }
    });
};
