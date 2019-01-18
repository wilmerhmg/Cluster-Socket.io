import express from 'express';
import path    from 'path';
import http    from 'http';
import * as ws from 'socket.io';

const redis  = require('socket.io-redis');
const app    = express();
const server = http.createServer({}, app);
const IO     = ws.listen(server);
const PORT   = process.env.PORT || 8086;

app.use(express.static(path.join(__dirname, 'slim-frontend')));
IO.adapter(redis({host: 'localhost', port: 32769}));

IO.on('connection', function (socket) {

  socket.on('PublicRoom', function (data) {
    IO.emit('news', data);
  });

});

server.listen(PORT, function () {
  console.log(`Server listening: http://0.0.0.0:${PORT}`);
});
