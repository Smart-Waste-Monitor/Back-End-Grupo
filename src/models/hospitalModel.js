var database = require("../database/config");

function buscarPorId(idhospital) {
  var instrucaoSql = `SELECT * FROM hospital WHERE idhospital = '${idhospital}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT 
      idhospital,
      nome,
      cnpj,
      email,
      codigo_ativacao,
      telefone
    FROM hospital;
  `;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM hospital WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj, email, telefone) {
  var instrucaoSql = `
    INSERT INTO hospital (nome, cnpj, email, telefone)
    VALUES ('${nome}', '${cnpj}', '${email}', '${telefone}');
  `;
  return database.executar(instrucaoSql);
}
module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
