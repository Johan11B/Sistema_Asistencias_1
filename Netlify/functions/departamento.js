var express = require('express');
var cors = require("cors");
var serverless = require ('serverless-http');
var port = process.env.PORT || 5000;
var departamentoroutes = require("../../Backend/routes/departamentoroutes.js");
var app = express();
app.use((req, res, next) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    try {
      if (data) {
        req.rawBody = data;
        req.body = JSON.parse(data);
      }
    } catch (err) {
      console.error("Error al parsear JSON:", err);
    }
    next();
  });
});
app.use(express.json());
app.use(cors());

app.use('/.netlify/functions/departamento', departamentoroutes);

module.exports.handler = serverless(app);