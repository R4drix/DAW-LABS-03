const express = require('express');
const app = express();
const fileRoutes = require('./routes/fileRoutes');
const path = require('path');

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../')));

app.use('/DAW-LABS-03/files', express.static(path.join(__dirname, '../files')));

app.use('/DAW-LABS-03/backend', fileRoutes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});