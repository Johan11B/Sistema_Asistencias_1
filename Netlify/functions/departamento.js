var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();
var departamentoroutes = require("../../Backend/routes/departamentoroutes");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/", departamentoroutes);
app.use("/", router);

exports.handler = serverless(app);
