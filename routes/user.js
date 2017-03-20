const router = require('express').Router();
const user = require('../services/user');

router.post('/registration', user.createNewUser);
router.post('/login', user.checkUserExistence);

module.exports = router;
