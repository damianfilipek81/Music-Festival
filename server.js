const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config()
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(helmet());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes); 
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' })
});
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lzufo.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, { cors: { origin: '*', } });

io.on('connection', (socket) => {
  console.log('New socket!');
})

module.exports = server;