// Acá nos falta express y el router
const express = require("express");
const router = express.Router();
// Aća nos falta traer el controller
const mainController = require("../controllers/mainController");

// Acá definimos las rutas
router.get("/", mainController.home);

// Acá exportamos el resultado
module.exports = router