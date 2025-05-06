const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantesController");

// Consultar estudiante (GET)
router.get("/", estudiantesController.consultar);

// Registrar nuevo estudiante (POST)
router.post("/", estudiantesController.ingresar);

// Modificar estudiante (PUT)
router.put("/", estudiantesController.modificar);

module.exports = router;