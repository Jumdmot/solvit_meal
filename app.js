// 모듈을 추출합니다.
var socketio = require('socket.io');
var express = require('express');
var fs = require('fs');

var seats = [
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    
];

// 웹 서버를 생성합니다.
var app = express();

// 라우트를 수행합니다.
app.get('/', function (request, response, next) {
    fs.readFile('index.html', function (error, data) {
        response.send(data.toString());
    });
});

app.get('/seats', function (request, response, next) {
    response.send(seats);
});

//서버 생성 및 실행
var http = require('http');
var port = process.env.PORT || 8080;
var server = http.createServer(app);
server.listen(port, function(){
 console.log('서버를 실행합니다.');
});


// 소켓 서버를 생성 및 실행합니다.
var io = socketio(server);
io.sockets.on('connection', function (socket) {
    socket.on('reserve', function (data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('reserve', data);
    });
});