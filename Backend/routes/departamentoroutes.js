const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentocontrollers.js");

router.get("/", departamentoController.consultar);
router.put("/", departamentoController.modificar); // <- Aquí se agrega la ruta PUT

module.exports = router;
