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
const caseRoutes = require('./src/routes/caseRoutes.js')
const attendanceRoutes = require('./src/routes/attendanceRoutes.js')
const academicPerformanceRoutes = require('./src/routes/academicPerformanceRoutes.js');
const cors = require('cors');



// const cors = require('./src/middlewares/cors.js');
const logger = require('./src/middlewares/logger.js');
const http = require('http');



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(responseHandler);

// app.use('/protected', authenticateToken);
app.use('/auth',  authRoutes);
app.use('/student', studentRoutes);
app.use('/school', schoolRoutes);
app.use('/donors', donorRoutes);
app.use('/case', caseRoutes);
app.use('/academic-performance', academicPerformanceRoutes);
app.use('/users', userRoutes);
app.use('/attendance', attendanceRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  dbConnect();
  console.log('Server Running at Port', port);
});
