import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A client connected.');

  socket.on('message', (data: string) => {
    console.log('Received message:', data);
    socket.broadcast.emit('message', data); // Broadcast the message to all connected clients except the sender
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Socket.IO server is running on http://localhost:${port}`);
});
