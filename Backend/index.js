const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Permitir solicitudes de CORS para conectar con el Frontend

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Habilitar CORS para permitir solicitudes desde el Frontend en Angular
app.use(cors());
app.use(express.json()); // Para poder recibir datos en formato JSON

//app.use(express.static(path.join(__dirname, 'public')));

// API para obtener un mensaje de prueba
app.get('/api/status', (req, res) => {
    res.json({ status: 'API funcionando correctamente' });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Configuración de Socket.IO para manejar conexiones y mensajes en tiempo real
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
    console.log(`Servidor API ejecutándose en http://localhost:${PORT}`);
});