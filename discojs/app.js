var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port);

////////////////////

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
    
    socket.on('get_drink', function( op_color, op_drink ) {
         io.sockets.emit('send_drink', {color:op_color, drink:op_drink} );
    });

});
