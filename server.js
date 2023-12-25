// server.js
const express = require('express');
const http = require('http');
const Socket = require('./socket');
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Hello From Backend" })
});

// socket connection
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
Socket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
