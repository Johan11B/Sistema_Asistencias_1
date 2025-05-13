const express = require("express");
const router = express.Router();
const asistenciasController = require("../controllers/asistenciasController");

router.get("/", asistenciasController.consultar);
router.post("/", asistenciasController.crear);
router.put("/", asistenciasController.actualizar);
router.patch("/", asistenciasController.modificar);

module.exports = router;