var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();
var asignaturaroutes = require("../../Backend/routes/asignaturaroutes");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/", asignaturaroutes);
app.use("/", router);

exports.handler = serverless(app);
