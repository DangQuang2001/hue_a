const express = require('express');
const messageModule = require('./socketIO/message');
const commentModule = require('./socketIO/comment');
const cors = require("cors");
const Pusher = require('pusher');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

const pusher = new Pusher({
  appId: "1582705",
  key: "3a3600a50892bc18f429",
  secret: "4ed06791057453d1d128",
  cluster: "ap1",
  useTLS: true
})



//Connect DB
const db = require("./config/db.js");
db.connect();

messageModule(io);
commentModule(io);

const Routes = require("./routes");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", cors(), Routes);


app.post('/pusher/user-auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const authResponse = pusher.authorizeChannel(socketId, channel);
  console.log(authResponse);
  res.send(authResponse);
})

app.get('/', (req, res) => res.send('Chào mừng bạn tới Huế Accommodation API <3 !'));

server.listen(3000, () => {
  console.log('Nhấn vào đây => http://localhost:3000');
});



module.exports = app