const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const port = process.env.Port || 3000;



app.listen( port ,function () {
    console.log(`server is listaenning on ${port} port`);
});

module.exports = app;