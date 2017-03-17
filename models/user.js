const mongoose = require('../db.js');
const crypto = require('crypto');

let userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        maxlength:16,
        minlength:0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        email:true
   },
    password_hash:{
        type: String,
        required: true
    },
    salt: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.new
    }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
    .set( function(password) {
       this._plainPassword = password;
       this.salt = Math.random().toString();
       this.password_hash = this.encryptPassword(password);
    })
    .get( function() {
       return this._plainPassword;
    });

userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.password_hash;
};

module.exports = mongoose.model('User',userSchema);