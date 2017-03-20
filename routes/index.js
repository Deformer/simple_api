const router = require('express').Router();
const userRoutes = require('./user');
const filesRouter = require('./file');
const newsRouter = require('./news');

router.use('/user',userRoutes);
router.use('/news',newsRouter);
router.use('/file',filesRouter);

module.exports = router;
