// servidor de express
const express = require('express');
const app = express();

// servidor de sockets
const server = require('http').createServer(app);

// Configuracion de socket server
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;

// Desplegar directorio publico 
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.emit('mensaje-bienvenida', {
    msg: 'Bienvenido al server',
    date: new Date()
  });

  // socket.on('mensaje-cliente', (data) => console.log(data))
  socket.on('message-to-server', (data) => {
    console.log(data);
    //con el io se emite para todo el mundo y el socket unicamente emitira para los sockets
    io.emit('message-from-server', data);
  })


});

server.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`));