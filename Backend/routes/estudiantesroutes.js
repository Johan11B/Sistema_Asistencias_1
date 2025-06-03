const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantescontrollers");

// Rutas para estudiantes
router.get("/", estudiantesController.consultarEstudiante);
router.post("/", estudiantesController.registrarEstudiante);
router.put("/", estudiantesController.modificarEstudiante);

// Rutas para asignaturas
router.get("/asignatura", estudiantesController.consultarAsignatura);
router.post("/asignatura", estudiantesController.agregarEstudianteAsignatura);

module.exports = router;