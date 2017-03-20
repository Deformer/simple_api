const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname,'../public/uploads/');
exports.getForm = (req,res) =>{
    let file = new fs.ReadStream(path.join(__dirname,'../public/html/fileForm.html'));
    file.pipe(res);

    file.on('error', err => {
        res.status(500).send(err);
        console.error(err);
    });

    res.on('close', () => {
        file.destroy();
    });
};

exports.upload = (req,res) => {
    let file = req.files[0],
        extension = file.originalname.split('.').slice(-1);
    fs.rename( uploadDir+file.filename,uploadDir+file.filename+'.'+extension, err => {
        if(err) console.error(err);
    });
    res.sendStatus(200);
};

exports.getFile = (req,res) => {
    let file = new fs.ReadStream(uploadDir+req.params.filename);
    file.pipe(res);

    file.on('error', err => {
        res.status(500).send(err);
        console.error(err);
    });

    res.on('close', () => {
        file.destroy();
    });
};

