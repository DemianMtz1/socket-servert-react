class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketsEvent();
    }

    socketsEvent() {
        // On connection 
        this.io.on('connection', (socket) => {
            // Escuchar evento: message-to-server
            socket.on('message-to-server', (data) => {
                console.log(data);
                //con el io se emite para todo el mundo y el socket unicamente emitira para los sockets
                this.io.emit('message-from-server', data);
            })

        });
    }
}

module.exports = Sockets;