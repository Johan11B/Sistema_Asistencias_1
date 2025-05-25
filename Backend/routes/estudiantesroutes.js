const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantescontrollers");

// Rutas para estudiantes
router.get("/", estudiantesController.consultar);
router.post("/", estudiantesController.ingresar);
router.put("/", estudiantesController.modificar);

// Rutas para asignaturas
router.get("/asignatura", estudiantesController.consultarAsignatura);
router.post("/asignatura", estudiantesController.agregarEstudianteAsignatura);

module.exports = router;