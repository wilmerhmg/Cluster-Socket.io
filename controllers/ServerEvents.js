'use strict';

function EventServerManager (app, server) {
   
    if(
        typeof app    === "undefined" ||
        typeof server === "undefined"
    ) return Error(`app instance of express or server it's required`);


    this.OnError = (error) => {
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
    }

    this.OnListening = () => {
        const addr   = server.address();
        console.log(`Server listening: http://${addr.address}:${addr.port}`);
    }

    return this;
}

module.exports = EventServerManager;