module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // listen for incoming comments from clients
        socket.on('comment', (msg) => {
            console.log('comment: ' + msg);
            io.emit('from_server', msg);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};