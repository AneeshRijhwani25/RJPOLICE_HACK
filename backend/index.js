const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const colors = require("colors");

const authRoutes = require('./routes/authRoutes');
const policeRoutes = require('./routes/policeRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes')
const firRoutes = require('./routes/firRoutes')
const feedbacksRoutes = require('./routes/feedbacksRoutes')
const suggestionRoutes = require('./routes/suggestionRoutes')
const smsRoutes = require('./routes/smsRoutes')

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

const prepareAndStartServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(cors());
  app.use(bodyParser.json());


  app.use('/auth', authRoutes);
  app.use('/police', policeRoutes);
  app.use('/appointments', appointmentRoutes);
  app.use('/fir', firRoutes);
  app.use('/feedback', feedbacksRoutes);
  app.use('/suggestions', suggestionRoutes);
  app.use('/sms', smsRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`.bgRed.white);
  });
}

prepareAndStartServer();