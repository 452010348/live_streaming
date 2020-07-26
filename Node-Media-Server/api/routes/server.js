const express = require('express');
const serverController = require('../controllers/server');

module.exports = (context) => {
  let router = express.Router();
  router.get('/', function(rsp, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    serverController.getInfo.bind(context);
  });
  return router;
};
