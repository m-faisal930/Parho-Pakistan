require('dotenv').config();
const express = require('express');
const dbConnect = require('./src/utils/dbConnect.js');
const responseHandler = require('./src/middlewares/responseHandler.js');
const authenticateToken = require('./src/middlewares/authToken.js');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const studentRoutes = require('./src/routes/studentRoutes.js');
const donorRoutes = require('./src/routes/donorRoutes.js');
const schoolRoutes = require('./src/routes/schoolRoutes.js');
const cors = require('./src/middlewares/cors.js');
const logger = require('./src/middlewares/logger.js');
const http = require('http');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(responseHandler);
app.use(cors)





app.use('/protected', authenticateToken);
app.use('/auth',  authRoutes);


app.use('/protected/students', studentRoutes);
app.use('/protected/schools', schoolRoutes);
app.use('/protected/donors', donorRoutes);



app.use('/protected/users', userRoutes);


const port = process.env.PORT || 3000;

// Socket.io Connection and Event Handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('chat message', (data) => {
//     io.emit('chat message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

app.listen(port, () => {
  dbConnect();
  console.log('Server Running at Port', port);
});
