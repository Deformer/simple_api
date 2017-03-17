const router = require('express').Router();
const User = require('../services/user');

router.post('/registration', (req,res) =>{
   User.createNewUser(req.body, err => {
      if(err){
         res.status(500).send(err);
      }
      else res.status(200).send('User was created successful');
   });
});

router.post('/login', (req,res) => {
   let email = req.body.email;
   let password = req.body.password;
   User.checckUserExistance(email, password, (err,user) => {
      if(err) res.status(500).send(err);
      else if(!user) res.send(404).send("wrong combination of login and password");
      else res.status(200).send(user);
   })
});

module.exports = router;
