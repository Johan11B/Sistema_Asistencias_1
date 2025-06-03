const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');

const app = express();

// ✅ Middleware necesarios
app.use(cors());
app.use(express.json());

// ✅ Rutas del departamento conectadas directamente
const departamentoroutes = require("../../Backend/routes/departamentoroutes.js");
app.use("/departamento", departamentoroutes); // Esto habilita la ruta /.netlify/functions/departamento

// ✅ Export correcto para Netlify
module.exports.handler = serverless(app);
