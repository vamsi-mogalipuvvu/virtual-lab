import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Store active rooms and their states
const rooms = new Map();

// Generate random color for user
const getRandomColor = () => {
  const colors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, userName }) => {
    socket.join(roomId);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: [],
        objects: [],
        constraints: []
      });
    }

    const room = rooms.get(roomId);
    const user = {
      id: socket.id,
      name: userName,
      color: getRandomColor()
    };

    // Add user to room
    room.users.push(user);

    // Send current room state to the joining user
    socket.emit('room-state', {
      objects: room.objects,
      constraints: room.constraints
    });

    // Notify all users in the room
    io.to(roomId).emit('room-users', room.users);
    
    console.log(`User ${userName} joined room ${roomId}`);
  });

  socket.on('object-added', ({ roomId, object }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.objects.push(object);
      // Broadcast to all other users in the room
      socket.to(roomId).emit('object-added', object);
    }
  });

  socket.on('constraint-added', ({ roomId, constraint }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.constraints.push(constraint);
      // Broadcast to all other users in the room
      socket.to(roomId).emit('constraint-added', constraint);
    }
  });

  socket.on('physics-update', ({ roomId, data }) => {
    // High-frequency physics state sync
    socket.to(roomId).emit('physics-update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from all rooms
    rooms.forEach((room, roomId) => {
      const userIndex = room.users.findIndex(u => u.id === socket.id);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        io.to(roomId).emit('room-users', room.users);
        
        // Clean up empty rooms
        if (room.users.length === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted (no users)`);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for connections`);
});
