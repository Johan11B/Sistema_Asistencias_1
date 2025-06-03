const express = require("express");
const router = express.Router();
const departamentocontroller = require("../controllers/departamentocontroller")

router.get("/",departamentocontroller.consultar)
router.post("/",departamentocontroller.modificar)

module.exports = router;