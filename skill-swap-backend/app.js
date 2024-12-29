require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas
const messagesRoutes = require('./routes/messages');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const matchRoutes = require('./routes/matches');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for sendMessage events
  socket.on('sendMessage', (message) => {
    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.use('/messages', messagesRoutes);
app.use('/auth', authRoutes);
app.use('/skills', skillRoutes);
app.use('/matches', matchRoutes);

const PORT = 5000;
// Use the HTTP server to listen, not the Express app
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));