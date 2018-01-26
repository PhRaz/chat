/*
 * Serveur de chat.
 */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var path = require('path');
var ent = require('ent');

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/*
 * connexion d'un nouveau client
 */
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.emit('demande_pseudo');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('pseudo', function (msg) {
        message = ent.encode(msg)  + ' a rejoint la conversation';
        console.log(message);
        socket.broadcast.emit('message', message);
        socket.emit('message', message);
    });

    socket.on('message', function (msg) {
        /*
         * encodage des entitées HTML pour ne pas injecter de HTML dans la page
         */
        message = '<span class="pseudo">' + ent.encode(msg.pseudo) + '</span> ' + ent.encode(msg.message);
        console.log(message);
        socket.broadcast.emit('message', message);
        socket.emit('message', message);
    });
});

/*
 * redirection si url non trouvée
 */
app.use(function (req, res, next) {
    res.redirect('/');
});

/*
 * démarrage du serveur
 */
server.listen(8080, function () {
    console.log('listening on *:8080');
});

