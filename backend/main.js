const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

const fs = require('fs');

const http = require('http');
//const https = require('https');

//routers
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');

//const privateKey = fs.readFileSync('/path/to/private/key', 'utf8');
//const certificate = fs.readFileSync('/path/to/full/chain', 'utf8');

//const credentials = {
//    key: privateKey,
//    cert: certificate
//};

let app = express();

app.use(bodyParser.json());
app.use(bearerToken());

app.use('/', indexRouter);
app.use('/user', userRouter);

// const httpServer = http.createServer((req, res) => {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// });

// const httpsServer = http.createServer(credentials, app);

const httpServer = http.createServer(app);

let port = (process.env.PORT || 2137);

httpServer.listen(port, () => {
    console.log('HTTP started on ' + port);
});

// httpsServer.listen(443, () => {
//     console.log('HTTPS started on 2137');
// })