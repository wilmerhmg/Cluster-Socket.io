import express from 'express';
import path    from 'path';
import http    from 'http';
import * as ws from 'socket.io';

const se     = require('./controllers/ServerEvents');
const ske    = require('./controllers/SocketEvents');
const redis  = require('socket.io-redis');
const app    = express();
const server = http.createServer({}, app);
const IO     = ws.listen(server);
const SE     = new se(app, server);
const SKE    = new ske(IO);

app.set('port', process.env.PORT || 8086);
IO.adapter(redis({host: 'localhost', port: 32769}));
app.use(express.static(path.join(__dirname, 'slim-frontend')));

server.on('error', SE.OnError);
server.on('listening', SE.OnListening);
server.listen(app.get('port'), "localhost");
