var http = require('http');
var express = require('express')
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port);

//////////////////

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/color.html');
});

app.get('/1QZeOVSbVfiU3Km73m_F9lSSnHnkMlxz8ilQJd5hipzQ', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

app.get('/guitar', function(request, response) {
  response.sendfile(__dirname + '/guitar.html');
});

app.use('/static', express.static(__dirname + '/public'));

//////////////////

var io = require('socket.io').listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
    
    socket.on('get_color', function(color) {
         io.sockets.emit('send_color',color);
    });
    
    socket.on('get_rand', function() {
         io.sockets.emit('send_rand');
    });
    
    socket.on('get_guitar', function() {
         io.sockets.emit('send_guitar');
    });
    
    socket.on('get_end', function() {
         io.sockets.emit('send_end');
    });

});

