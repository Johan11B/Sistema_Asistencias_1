const express = require("express");
const router = express.Router();
const estudiantescontroller = require("../controllers/departamentocontrollers.js")

router.get("/",estudiantescontroller.consultar)
router.post("/",estudiantescontroller.ingresar)


module.exports = router;