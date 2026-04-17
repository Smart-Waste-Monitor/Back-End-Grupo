 // Array para armazenar empresas cadastradas para validação de código de ativação 
  let listaEmpresasCadastradas = [];

  function cadastrar() {
    // aguardar();
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let nomeVar = nome_completo.value;
    let senhaVar = senha_imp.value;
    let confirmacaoSenhaVar = confirmar_senha.value;
    let telefoneVar = telefone_imp.value;
    let emailVar = email.value;
    let cod_hospVar = Cod_hospital_imp.value;


    let idEmpresaVincular;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      telefoneVar == "" ||
      confirmacaoSenhaVar == "" ||
      cod_hospVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;

      //Verificando se o nome é maior ou igual a um caractere
    } else if (nomeVar.length <= 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Nome com um ou menos caracteres)";
      finalizarAguardar();
      return false;

      //Verificando se há algum @ no email
    } else if (emailVar.indexOf('@') == -1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Não contém arroba)";
      finalizarAguardar();
      return false;

      //Verificando se há algum . no email
    } else if (emailVar.indexOf('.') == -1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Não contém .)";
      finalizarAguardar();
      return false;

      //Verificando se a senha é maior ou igual a 6 caracteres 
    } else if (senhaVar.length <= 6) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Senha com 6 ou menos digitos)";
      finalizarAguardar();
      return false;

      //Verificando se a senha e a confirmacão são iguais
    } else if (senhaVar != confirmacaoSenhaVar) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Não é igual a senha)";
      finalizarAguardar();
      return false;

    } else {
      // fecha em 5 segundos se não tiver erros
      setTimeout(sumirMensagem, 5000);
    }

    //for concertado para rodar todas as "empresas"
    let codigoValido = false;

    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
      if (listaEmpresasCadastradas[i].codigo_ativacao == cod_hospVar) {
        idEmpresaVincular = listaEmpresasCadastradas[i].id;
        codigoValido = true;
        break;
      }
    }

    if (!codigoValido) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "Código do hospital inválido.";
      return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        telefoneServer: telefoneVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        cod_hospServer: cod_hospVar,

        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

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

  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            console.log("listaEmpresasCadastradas")
            console.log(listaEmpresasCadastradas[0].codigo_ativacao)
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  //função para remover os modais
  function sumirMensagem() {
    cardErro.style.display = "none";
  }