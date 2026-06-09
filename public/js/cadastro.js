let listahospitalCadastradas = [];
let codigoValido = false;
let idhospitalVincular;

function cadastrar() {
  let nomeVar = nome_completo.value;
  let senhaVar = senha_imp.value;
  let confirmacaoSenhaVar = confirmar_senha.value;
  let emailVar = email.value;
  let cod_hospVar = Cod_hospital_imp.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    cod_hospVar == ""
  ) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
    finalizarAguardar();
    return false;

    // Verificando se o nome é maior ou igual a um caractere
  } else if (nomeVar.length <= 1) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(Nome com um ou menos caracteres)";
    finalizarAguardar();
    return false;

    // Verificando se há algum @ no email
  } else if (emailVar.indexOf("@") == -1) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(Não contém '@' no email)";
    finalizarAguardar();
    return false;

    // Verificando se há algum . no email
  } else if (emailVar.indexOf(".") == -1) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(Não contém '.' no email)";
    finalizarAguardar();
    return false;

    // Verificando se a senha é maior que 6 caracteres
  } else if (senhaVar.length <= 6) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(A senha precisa ter 7 ou mais caracteres)";
    finalizarAguardar();
    return false;

    // Verificando se a senha e a confirmação são iguais
  } else if (senhaVar != confirmacaoSenhaVar) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(As senhas não são iguais)";
    finalizarAguardar();
    return false;

    // Verificando se a senha possui pelo menos um número
  } else if (
    !senhaVar.includes("1") &&
    !senhaVar.includes("2") &&
    !senhaVar.includes("3") &&
    !senhaVar.includes("4") &&
    !senhaVar.includes("5") &&
    !senhaVar.includes("6") &&
    !senhaVar.includes("7") &&
    !senhaVar.includes("8") &&
    !senhaVar.includes("9")
  ) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(A senha precisa ter números)";
    finalizarAguardar();
    return false;

    // Verificando se existe pelo menos uma letra maiúscula
  } else if (senhaVar.toLowerCase() == senhaVar) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(A senha precisa ter pelo menos uma letra maiúscula)";
    finalizarAguardar();
    return false;

    // Verificando se existe pelo menos uma letra minúscula
  } else if (senhaVar.toUpperCase() == senhaVar) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "(A senha precisa ter pelo menos uma letra minúscula)";
    finalizarAguardar();
    return false;

  } else {
    // Fecha a mensagem após 5 segundos
    setTimeout(sumirMensagem, 5000);
  }

  // Procura o hospital cujo codigo_ativacao bate com o código digitado pelo usuário
  let hospitalEncontrado = null;

  for (let i = 0; i < listahospitalCadastradas.length; i++) {
    if (listahospitalCadastradas[i].codigo_ativacao == cod_hospVar) {
      hospitalEncontrado = listahospitalCadastradas[i];
      break;
    }
  }

  // Se nenhum hospital foi encontrado com esse código, bloqueia o cadastro
  if (hospitalEncontrado == null) {
    cardErro.style.display = "block";
    cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
    mensagem_erro.innerHTML = "Código do hospital inválido.";
    finalizarAguardar();
    return false;
  }

  idhospitalVincular = hospitalEncontrado.idhospital;

  // Enviando os dados para o servidor
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      cod_hospServer: cod_hospVar,
      idhospitalVincularServer: idhospitalVincular, // agora com valor correto
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";
        cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function listar() {
  fetch("/hospital/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((hospitais) => {

        // Limpa a lista antes de repovoar
        listahospitalCadastradas = [];

        for (let i = 0; i < hospitais.length; i++) {
          listahospitalCadastradas.push(hospitais[i]);
        }

        console.log("Hospitais carregados:", listahospitalCadastradas);
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}

function finalizarAguardar() { }