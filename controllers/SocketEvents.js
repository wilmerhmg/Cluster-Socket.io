'use strict';

function EventSocketManager (IO) {
    
    this.IO = IO;

    IO.on('connection', function(Socket){
        OnConnection.call(this, Socket);
    }.bind(this));

}

function OnConnection (Socket) {

    console.info(`New client has connected ${Socket.id}`);

    Socket.on('PublicRoom', function(InputData){
        PublicRoom.call(this, this.IO, Socket, InputData);
    }.bind(this));

    Socket.on('disconnect', function(){
        OnDisconnect.call(this, Socket);
    }.bind(this));

}

function OnDisconnect(Socket) {

    console.info(`Client disconnected ${Socket.id}`);

}

function PublicRoom(IO, Socket, InputData) {
    IO.emit('news', InputData);
}

module.exports = EventSocketManager;
