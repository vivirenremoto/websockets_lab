var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port);

//////////////////

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

app.get('/controller', function(request, response) {
  response.sendfile(__dirname + '/controller.html');
});

app.use('/static', express.static(__dirname + '/public'));

//////////////////

var io = require('socket.io').listen(server);

/*
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
*/


io.sockets.on('connection', function (socket) {

    socket.on('get_connection', function() {
         io.sockets.emit('send_connection');
    });

    socket.on('get_lights', function( enable ) {
         io.sockets.emit('send_lights', enable);
    });
    
    socket.on('get_music', function( enable ) {
         io.sockets.emit('send_music', enable);
    });

    socket.on('get_temperature', function( enable ) {
         io.sockets.emit('send_temperature', enable);
    });

});
