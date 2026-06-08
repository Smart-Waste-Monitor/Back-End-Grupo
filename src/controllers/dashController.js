var dashboardModel = require("../models/dashModel");

function consultaGeralLixeiras(req, res) {
    dashboardModel.lixeirasGerais()
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaAlertasLixeiras(req, res) {
    dashboardModel.lixeirasAlertas()
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaCriticasLixeiras(req, res) {
    dashboardModel.lixeirasCriticas()
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaGraficoEspecifico(req, res) {
    dashboardModel.graficoEspecifico()
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaGraficoFiltrado(req, res) {
    var filtro = req.body.filtroServer;
    dashboardModel.graficoFiltrado(filtro)
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastroAlerta(req, res) {
    var msg = req.body.msgServer;
    var nivel = req.body.nivelServer;
    var dataHora = req.body.dataHoraServer;
    var fkLeitura = req.body.idLeituraServer;
    dashboardModel.cadastrarAlerta(msg, nivel, dataHora, fkLeitura)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function alerta(req, res) {
    dashboardModel.consultaAlerta()
        .then(
            function (resultadoconsulta) {
                console.log(`\nResultados encontrados: ${resultadoconsulta.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoconsulta)}`);

                if (resultadoconsulta.length > 0) {
                    res.json(resultadoconsulta); // retorna todos os resultados
                } else {
                    res.status(404).send("Nenhuma tentativa encontrada");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    consultaGeralLixeiras,
    consultaAlertasLixeiras,
    consultaCriticasLixeiras,
    consultaGraficoEspecifico,
    consultaGraficoFiltrado,
    cadastroAlerta,
    alerta
}