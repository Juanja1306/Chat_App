const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servir archivos estáticos de la misma carpeta Backend
app.use(express.static(path.join(__dirname)));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuración de Socket.IO para manejar conexiones
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escuchar los mensajes enviados por el cliente
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data); // Enviar el mensaje a todos los clientes conectados
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
