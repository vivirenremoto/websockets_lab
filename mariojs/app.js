var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port);

/////////////////////

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

app.get('/controller', function(request, response) {
  response.sendfile(__dirname + '/controller.html');
});

app.use('/static', express.static(__dirname + '/public'));

//////////////////

var io = require('socket.io').listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


io.sockets.on('connection', function (socket) {

    socket.on('get_connection', function( session_id ) {
        io.sockets.socket(session_id).emit('send_connection');
    });
    
    socket.on('move_left', function( session_id ) {
        io.sockets.socket(session_id).emit('send_left');
    });
    
    socket.on('move_right', function( session_id ) {
        io.sockets.socket(session_id).emit('send_right');
    });

    socket.on('move_stop', function( session_id ) {
        io.sockets.socket(session_id).emit('send_stop');
    });

});

