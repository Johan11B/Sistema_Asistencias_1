var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();
var departamentoroutes = require("../../Backend/routes/departamentoroutes.js");

app.use(express.json());
app.use(cors());

// Usa el router exactamente como en tu ejemplo funcional
var router = express.Router();
router.use("/departamento", departamentoroutes); // <- Cambiado a "departamento"

// Esta línea debe ser exactamente así como en tu ejemplo que funciona
app.use('/.netlify/functions', router);

// Exportación idéntica a tu ejemplo funcional
exports.handler = serverless(app);