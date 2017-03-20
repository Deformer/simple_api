const router = require('express').Router();
const news = require('../services/news');

router.get('/',news.getAllNews);
router.get('/:id',news.getNewsById);
router.post('/',news.addNews);

module.exports = router;