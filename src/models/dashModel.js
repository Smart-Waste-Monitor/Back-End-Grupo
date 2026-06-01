var database = require("../database/config");

function lixeirasGerais() {
    var instrucaoSql = `SELECT * FROM vw_geralVolumes;`;

    return database.executar(instrucaoSql);
}

function lixeirasAlertas() {
    var instrucaoSql = `SELECT * FROM vw_geralVolumes WHERE volume_percentual >= 50 && volume_percentual < 75;`;

    return database.executar(instrucaoSql);
}

function lixeirasCriticas() {
    var instrucaoSql = `SELECT * FROM vw_geralVolumes  WHERE volume_percentual >= 75;`;

    return database.executar(instrucaoSql);
}

module.exports = { 
    lixeirasGerais,
    lixeirasAlertas,
    lixeirasCriticas
};
