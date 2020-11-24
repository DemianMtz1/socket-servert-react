// servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        // Configuracion socket
        this.io = socketio(this.server, /* Configuraciones */);
    }

    middlewares() {
        // Desplegar directorio publico 
        this.app.use(express.static( path.resolve(__dirname, '../public')));
    }

    socketsConfig(){
        new Sockets(this.io);
    }

    execute() {
        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.socketsConfig();

        // Inicializar el server
        this.server.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }

}

module.exports = Server;