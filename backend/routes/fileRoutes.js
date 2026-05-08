const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const router = express.Router();

const FILES_DIR = path.join(__dirname, '../../files');


// LISTAR ARCHIVOS
router.get('/files', function (req, res) {
  fs.readdir(FILES_DIR, function (err, files) {
    if (err) {
      return res.json({ archivos: [] });
    }

    const mdFiles = files.filter(f => f.endsWith('.md'));

    res.json({ archivos: mdFiles });
  });
});


// LEER ARCHIVO Y CONVERTIR A HTML
router.get('/file', function (req, res) {
  const nombre = req.query.nombre;

  const filePath = path.join(FILES_DIR, nombre);

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return res.json({ html: '<p>Error al leer archivo</p>' });
    }

    const html = marked.parse(data);

    res.json({ html: html });
  });
});


// CREAR ARCHIVO
router.post('/file', function (req, res) {
  const nombre = req.body.nombre;
  const contenido = req.body.contenido;

  const filePath = path.join(FILES_DIR, nombre);

  fs.writeFile(filePath, contenido, function (err) {
    if (err) {
      return res.json({ mensaje: 'Error al guardar archivo' });
    }

    res.json({ mensaje: 'Archivo creado correctamente' });
  });
});

module.exports = router;