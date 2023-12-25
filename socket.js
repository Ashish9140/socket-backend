
const websiteRoom = 'websiteRoom'; // Room for all website users
const appRoom = 'appRoom'; // Room for app users

function Socket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');
        
        const queryParams = new URLSearchParams(socket.handshake.query);
        const userType = queryParams.get('userType');
        
        if (userType === 'web') {
          console.log('Web user connected');
          socket.join(websiteRoom); // Join web user to the websiteRoom
        } else if (userType === 'app') {
          console.log('App user connected');
          socket.join(appRoom); // Join app user to the appRoom
        } else {
          console.log('Unknown user type. Disconnecting...');
          socket.disconnect();
          return;
        }
        
        // Handle messages from both web and app users
        socket.on('messageFromUser', (message) => {
          console.log('Message from user:', message);

          console.log(message);
          
          // Broadcast the message based on user type
          if (userType === 'web') {
            io.to(websiteRoom).emit('messageToWebsite', message);
          } else {
            io.to(appRoom).emit('messageToApp', message);
          }
        });
        
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
}

module.exports = Socket;