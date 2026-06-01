var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/lixeirasGerais", function (req, res) {
    dashController.consultaGeralLixeiras(req, res);
})

router.post("/lixeirasAlertas", function (req, res) {
    dashController.consultaAlertasLixeiras(req, res);
})

router.post("/lixeirasCriticas", function (req, res) {
    dashController.consultaCriticasLixeiras(req, res);
})

module.exports = router;