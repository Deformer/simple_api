const userModel = require('../models/user');
const assert = require('assert');

exports.createNewUser = (userObj,cb) => {
    assert.equals(typeof cb, 'function',
    "callback should be a function");
    let user = new User(req.body);
    user.save( err => {
        if(err){
            console.error(err);
            cb(err);
        }
        else cb(null);
    });
};
