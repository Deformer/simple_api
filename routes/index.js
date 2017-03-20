const router = require('express').Router();
const userRoutes = require('./user');
const filesRouter = require('./file');

router.use('/user',userRoutes);
router.use('/file',filesRouter);

module.exports = router;
