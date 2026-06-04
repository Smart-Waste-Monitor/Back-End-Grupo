var database = require("../database/config");

// É um hook, gancho né, eu vou ficar usando isso sempre que as funções forem chamadas, justamente para sempre tirar prints e tals
function refresha() {
    return database.executar(`DROP VIEW IF EXISTS vw_atualVolumes`)
        .then(function () {
            return database.executar(`DROP VIEW IF EXISTS vw_geralVolumes`);
        })
        .then(function () {
            return database.executar(`
                CREATE VIEW vw_geralVolumes AS
                SELECT nome_lixeira,
                    tipo_residuo,
                    volume_atual,
                    volume_percentual,
                    data_medicao
                FROM (
                    SELECT 
                        l.identificacao AS nome_lixeira,
                        t.descricao AS tipo_residuo,
                        le.volumeAtual AS volume_atual,
                        ROUND(((400 - le.volumeAtual) / 400) * 100, 2) AS volume_percentual,
                        le.dataHora AS data_medicao,
                        ROW_NUMBER() OVER (
                            PARTITION BY l.identificacao
                            ORDER BY le.dataHora DESC
                        ) AS rn
                    FROM lixeira l
                        JOIN tipoResiduo t ON l.fk_tipoResiduo_idTipo = t.idTipo
                        JOIN leitura le ON l.fk_sensor_idSensor = le.fk_sensor_idSensor
                ) ranked
                WHERE rn <= 48
                ORDER BY nome_lixeira ASC, data_medicao ASC
            `);
        })
        .then(function () {
            return database.executar(`
                CREATE VIEW vw_atualVolumes AS
                SELECT l.identificacao AS nome_lixeira,
                    t.descricao AS tipo_residuo,
                    le.volumeAtual AS volume_atual,
                    ROUND(((400 - le.volumeAtual) / 400) * 100, 2) AS volume_percentual,
                    le.dataHora AS ultima_medicao
                FROM lixeira l
                JOIN tipoResiduo t
                    ON l.fk_tipoResiduo_idTipo = t.idTipo
                JOIN leitura le
                    ON l.fk_sensor_idSensor = le.fk_sensor_idSensor
                WHERE le.idLeitura = (
                    SELECT idLeitura FROM leitura le2
                    WHERE le2.fk_sensor_idSensor = l.fk_sensor_idSensor
                    ORDER BY le2.dataHora DESC
                    LIMIT 1
                )
                ORDER BY l.identificacao ASC
            `);
        });
}

// Funções do model

function lixeirasGerais() {
    return refresha()
        .then(function () {
            return database.executar(`SELECT * FROM vw_atualVolumes`);
        });
}

function lixeirasAlertas() {
    return refresha()
        .then(function () {
            return database.executar(`SELECT * FROM vw_atualVolumes WHERE volume_percentual >= 50 AND volume_percentual < 75`);
        });
}

function lixeirasCriticas() {
    return refresha()
        .then(function () {
            return database.executar(`SELECT * FROM vw_atualVolumes WHERE volume_percentual >= 75`);
        });
}

function graficoEspecifico() {
    return refresha()
        .then(function () {
            return database.executar(`SELECT * FROM vw_geralVolumes`);
        });
}

module.exports = {
    lixeirasGerais,
    lixeirasAlertas,
    lixeirasCriticas,
    graficoEspecifico
};