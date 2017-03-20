const mongoose = require('../db.js');

let newsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// newsSchema.pre('save', next => {
//     let now = new Date();
//     if(!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });

module.exports = mongoose.model('News',newsSchema);