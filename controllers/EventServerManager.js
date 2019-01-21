function EventServerManager(IO) {
    IO.on('connection', this.OnConnection);
    IO.on('disconnect');
}
exports.EventServerManager = EventServerManager;
