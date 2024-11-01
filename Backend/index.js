const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Permitir solicitudes de CORS para conectar con el Frontend

const app = express();
const server = http.createServer(app);

// Configuración de CORS en Socket.IO
const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200", // Dirección de tu cliente Angular
      methods: ["GET", "POST"],
      credentials: true
    }
});

const PORT = 3000;

// Habilitar CORS en Express para el cliente Angular
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json()); // Permitir solicitudes JSON

// Ruta de prueba para verificar la API
app.get('/api/status', (req, res) => {
    res.json({ status: 'API funcionando correctamente' });
});

// Configuración de Socket.IO para manejar conexiones en tiempo real
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escuchar mensajes desde el cliente
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data); // Reenviar mensaje a todos los clientes
    });

    // Detectar desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor API ejecutándose en http://localhost:${PORT}`);
});
