const express = require('express');
const messageModule = require('./socketIO/message');
const commentModule = require('./socketIO/comment');
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

//Connect DB
const db = require("./config/db.js");
db.connect();

messageModule(io);
commentModule(io);

const Routes = require("./routes");
app.use(express.static("public"));
app.use(express.json());
app.use("/api", cors(), Routes);

app.get('/', (req, res) => res.send('Chào mừng bạn tới Huế Accommodation API <3 !'));

server.listen(3000, () => {
  console.log('Nhấn vào đây => http://localhost:3000');
});



module.exports = app