// Módulos
const express = require('express');
const app = express();
const path = require("path");
// Acá falta uno... 😇

// Configuración
app.use(express.static(path.join(__dirname, '../public')));
// Acá falta el template engine

// Rutas
// Acá falta el archivo de rutas y después las vistas de EJS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"))
});

app.listen(3000, () => { console.log('Servidor arriba en el puerto 3000 🤓👌');})