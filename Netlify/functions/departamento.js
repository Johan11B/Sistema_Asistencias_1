const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Carga directa de las rutas
const departamentoroutes = require("../../Backend/routes/departamentoroutes.js");
app.use("/", departamentoroutes); // SIN prefijo /departamento

module.exports.handler = serverless(app);
