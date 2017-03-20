const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./db');
const morgan = require('morgan');
const config = require('config');

app.use(session({
    secret: 'foo',
    resave:true,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use((req,res) => {
   res.status(404).send("404 Page not found");
});
const port = process.env.Port || 3000;



app.listen( port ,function () {
    console.log(`server is listening ${port} port`);
});

module.exports = app;