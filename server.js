var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;
var morgan = require('morgan');

// Config
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

// Controller
app.get('/', function(req, res){
  res.sendFile('/index.html');
});

// Sockets
users = [];
connections = [];

io.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets currently connected', connections.length);

  // Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets currently connected', connections.length);
  });

  // Send Message
  socket.on('chat message', function(msg) {
    io.sockets.emit('chat message', msg);
  });

});

// TODO:
// broadcast message when user connects/disconnects
// add support for nicknames
// 'user is typing' functionality
// dont send the same message to user that sent it himself, just DOM manipulate
// Show who is online
// Private messaging

server.listen(port, function(){
  console.log('listening on %s', port);
});
