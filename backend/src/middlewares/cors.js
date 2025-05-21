const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const allowedOrigins = [process.env.VITE_BASE_URL, 'http://52.71.51.45'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Refresh-Token'],
  credentials: true
};

module.exports = cors(corsOptions);
