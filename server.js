import express from 'express';
import path    from 'path';
import http    from 'http';
import * as ws from 'socket.io';

const redis  = require('socket.io-redis');
const app    = express();
const server = http.createServer({}, app);
const IO     = ws.listen(server);

const onListening = () => {
  const addr = server.address();
  console.log(`Server listening: http://${addr.address}:${addr.port}`);
};

const onError = (error) => {
  if(error.syscall !== 'listen') throw error;

  const bind = parseInt(app.get('port'), 10) || 8086;

  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use....`);
    console.error(`Trying to use ${bind + 1}`);
    app.set('port', bind + 1);
    server.listen(app.get('port'), "localhost");
    break;
  default:
    throw error
  }
};

app.set('port', process.env.PORT || 8086);
IO.adapter(redis({host: 'localhost', port: 32769}));
app.use(express.static(path.join(__dirname, 'slim-frontend')));

IO.on('connection', (socket) => {
  console.info(`New client connected id: ${socket.id}`);
  socket.on('PublicRoom', (data) => {
    IO.emit('news', data);
  });

});

server.on('error', onError);
server.on('listening', onListening);
server.listen(app.get('port'), "localhost");
