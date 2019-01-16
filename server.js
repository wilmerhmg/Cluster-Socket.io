const io    = require('socket.io')(3002);
const redis = require('socket.io-redis');
io.adapter(redis({host: 'localhost', port: 32769}));

io.emit('hi-event','Hello world');
