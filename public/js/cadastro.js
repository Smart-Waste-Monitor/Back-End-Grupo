 // Array para armazenar hospital cadastradas para validação de código de ativação 
  let listahospitalCadastradas = [];

  function cadastrar() {
    // aguardar();
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let nomeVar = nome_completo.value;
    let senhaVar = senha_imp.value;
    let confirmacaoSenhaVar = confirmar_senha.value;
    let emailVar = email.value;
    let cod_hospVar = Cod_hospital_imp.value;


    let idhospitalVincular;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" ||
      cod_hospVar == ""
    ) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";

      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;

      //Verificando se o nome é maior ou igual a um caractere
    } else if (nomeVar.length <= 1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Nome com um ou menos caracteres)";
      finalizarAguardar();
      return false;

      //Verificando se há algum @ no email
    } else if (emailVar.indexOf('@') == -1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Não contém '@' na email)";
      finalizarAguardar();
      return false;

      //Verificando se há algum . no email
    } else if (emailVar.indexOf('.') == -1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Não contém '.' na email)";
      finalizarAguardar();
      return false;

      //Verificando se a senha é maior ou igual a 6 caracteres 
    } else if (senhaVar.length <= 6) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(A senha precisa ter 7 ou mais caracteres)";
      finalizarAguardar();
      return false;

      //Verificando se a senha e a confirmacão são iguais
    } else if (senhaVar != confirmacaoSenhaVar) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(As senhas não são iguais)";
      finalizarAguardar();
      return false;

    }else if(!senhaVar.includes("1")&&!senhaVar.includes("2")&&!senhaVar.includes("3")&&!senhaVar.includes("4")
    &&!senhaVar.includes("5")&&!senhaVar.includes("6")&&!senhaVar.includes("7")&&!senhaVar.includes("8")
    && !senhaVar.includes("9") ){
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(A senha precisa ter numeros)";
      finalizarAguardar();
      return false; 

    }else if (senhaVar.toLowerCase() == senhaVar) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(A senha precisa ter pelo menos uma letra maiúscula)";
      finalizarAguardar();
      return false; 

    }else if (senhaVar.toUpperCase() == senhaVar) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(A senha precisa ter pelo menos uma letra minúscula)";
      return false;
}

    else {
      // fecha em 5 segundos se não tiver erros
      setTimeout(sumirMensagem, 5000);
    }

    //for concertado para rodar todas as "hospitais"
    let codigoValido = false;

    for (let i = 0; i < listahospitalCadastradas.length; i++) {
      if (listahospitalCadastradas[i].codigo_ativacao === cod_hospVar) {
        idhospitalVincular = listahospitalCadastradas[i].idhospital;
        codigoValido = true;
        break;
      }
    }

    if (!codigoValido) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
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
        emailServer: emailVar,
        senhaServer: senhaVar,
        cod_hospServer: cod_hospVar,

        idhospitalVincularServer: idhospitalVincular
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

  // Listando hospitals cadastradas 
 function listar() {
  fetch("/hospital/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((hospital) => {

        listahospitalCadastradas = [];

        hospital.forEach((hospital) => {
          listahospitalCadastradas.push(hospital);

          console.log(listahospitalCadastradas);
          console.log(listahospitalCadastradas[0].codigo_ativacao);
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

  function finalizarAguardar() {
}