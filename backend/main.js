const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');

const http = require('http');
const https = require('https');

//routers
const indexRouter = (require(path.join(__dirname, 'routes/index.js')));

const privateKey = fs.readFileSync('/etc/letsencrypt/live/bartor.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/bartor.net/fullchain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

let app = express();

app.use(bodyParser.json());

app.use('/', indexRouter);

const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});

const httpsServer = http.createServer(credentials, app);

let port = (process.env.PORT || 2137);

httpServer.listen(3000, () => {
    console.log('HTTP started on 3000');
});

httpsServer.listen(2137, () => {
    console.log('HTTPS started on 2137');
})