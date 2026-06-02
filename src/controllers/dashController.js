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

module.exports = {
    consultaGeralLixeiras,
    consultaAlertasLixeiras,
    consultaCriticasLixeiras,
    consultaGraficoEspecifico
}