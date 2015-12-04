var net = require('net');

//create a new network server
var server = net.createServer();

//array of connect clients
var clients = [];

server.on('connection', function(socket) {
    var name;

    function broadcast(name, message) {
        clients.forEach(function(client) {
            if (client !== socket) {
                client.write('[' + name + '] ' + message);
            }
        });
    };

    clients.push(socket);

    socket.write('Hello! What is your name?\n');

    socket.on('data', function(data) {
        if (!name) {
            name = data.toString().trim();
            socket.write('Hello ' + name + '!\n');
        } else {
            broadcast(name, data.toString().trim());
        }
    });
});

server.on('lisening', function() {
    console.log('server listening on port 3000');
});

server.listen(3000);