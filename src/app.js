// Módulos
const express = require('express');
const app = express();
const path = require("path");
// Acá falta uno... 😇
const mainRouter = require("./routes/mainRouter");
const productRouter = require("./routes/productRouter");

// Configuración
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
// Acá falta el template engine
// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// Rutas
app.use("/", mainRouter);
app.use("/products", productRouter);

app.listen(3000, () => { console.log('Servidor arriba en el puerto 3000');})