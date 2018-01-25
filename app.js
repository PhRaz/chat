/*
 * Serveur de chat.
 */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/*
 * connexion d'un nouveau client
 */
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message', function(msg) {
       console.log('message: ' + msg);
    });
});

/*
 * redirection si url non trouvée
 */
app.use(function(req, res, next) {
    res.redirect('/');
});

/*
 * démarrage du serveur
 */
server.listen(8080, function() {
    console.log('listening on *:8080');
});

