/**
 * Created by sbelan on 3/20/2017.
 */
const router = require('express').Router();
const file = require('../services/file');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/') });

router.get('/',file.getForm);
router.post('/', upload.any() , file.upload);
router.get('/:filename', file.getFile);

module.exports = router;