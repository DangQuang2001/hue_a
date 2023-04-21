module.exports = (io) => {
    var roomIdServer = "";
    io.on('connection', (socket) => {
        console.log('A user connected');

        // listen for incoming chat messages from clients
        socket.on('join-room', (roomId) => {
            console.log(`Người dùng đã tham gia vào phòng chat ${roomId}`);
            socket.join(roomId);
            roomIdServer = roomId;
            const room = io.sockets.adapter.rooms.get(roomId);
            const clients = room ? [...room] : [];
            io.to(roomId).emit('list-user-join-room', clients);
        });

        socket.on('send-message', ({ roomId, message }) => {
            console.log(`Tin nhắn mới từ phòng chat ${roomId}: ${message}`);
            io.to(roomId).emit('new-message', message);

        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            const room = io.sockets.adapter.rooms.get(roomIdServer);
            const clients = room ? [...room] : [];
            io.to(roomIdServer).emit('list-user-join-room', clients);
        });
    });
};