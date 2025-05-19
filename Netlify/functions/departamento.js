var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();
var departamentoroutes = require("../../Backend/routes/departamentoroutes");

// Middlewares
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Para permitir peticiones cruzadas

// Configuración del router
var router = express.Router();
router.use("/", departamentoroutes);
app.use("/", router);

// Exportación para Netlify
exports.handler = serverless(app);