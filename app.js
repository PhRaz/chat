/*
 * Serveur de chat.
 */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res, next) {
    res.sendFile('index.html');
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
app.use(function() {
    res.redirect('/');
});

/*
 * démarrage du serveur
 */
server.listen(8080, function() {
    console.log('listening on *:8080');
});

