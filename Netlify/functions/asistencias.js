var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();
var asistenciasroutes = require("../../Backend/routes/asistenciasroutes");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/", asistenciasroutes);
app.use("/", router);

exports.handler = serverless(app);
