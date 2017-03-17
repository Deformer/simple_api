const router = require('express').Router();
const User = require('../models/user');

router.post('/registration', (req,res) =>{
   console.log(req.body);
   let user = new User(req.body);
   user.save( err => {
      if(err){
         res.status(500).send(err);
         console.log(err)
      }
      else res.status(200).send('User was created successful');
   });
});

router.post('/login', (req,res) => {
    let userObj = req.body;
   User.findOne( {email: userObj.email}, (err,user) =>{
      if(err) res.sendStatus(500);
      else if(!user) res.status(404).send("User doesn't exist");
      else{
         let correctPassword = user.checkPassword(userObj.password);
         if(!correctPassword) res.status(400).send('wrong combination of email and password');
         else res.status(200).send(user);
      }
   });
});

module.exports = router;
