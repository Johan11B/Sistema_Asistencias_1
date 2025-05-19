const express = require("express");
const router = express.Router();
const departamentocontroller = require("../controllers/departamentocontroller");

// Ruta GET para consultar el departamento
router.get("/", departamentocontroller.consultar);

// Ruta PUT para modificar el departamento
router.put("/", departamentocontroller.modificar);

module.exports = router;