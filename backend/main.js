const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const http = require('http');

//routers
const indexRouter = (require(path.join(__dirname, 'routes/index.js')));

let app = express();

app.use(bodyParser.json());

app.use('/', indexRouter);

let server = http.createServer(app);
let port = (process.env.PORT || 2137);

server.listen(port, () => {
    console.log('Server started on ' + port);
});