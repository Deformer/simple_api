const News = require('../models/news');
const mongoose = require('../db');

exports.getNewsById = (req,res) =>{
    News.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, (err,news) => {
       if(err){
           res.status(500).send(err);
           console.error(err);
       } else if(!news) res.send(404).send(`News with id:${req.params.id} isn't exist`);
       else res.status(200).json(news);
    });
};

exports.getAllNews = (req,res) => {
  News.find({},(err,news) =>{
     if(err){
         res.status(500).send(err);
         console.error(err);
     }
     else res.status(200).json(news);
  });
};

exports.addNews = (req,res) => {
    let news = new News(req.body);
    news.save((err) => {
        if(err){
            res.status(500).send(err);
            console.error(err);
        }
        else res.sendStatus(200);
    })
};