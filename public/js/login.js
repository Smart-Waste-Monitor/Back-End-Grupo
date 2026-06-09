function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    // Verifica se algum campo está vazio se sim mostra um erro
    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    }
    else {
        // Faz a mensagem de erro sumir após 5 segundos
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) { // Recebe a resposta do servidor
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {  // Verifica se o login foi realizado com sucesso
            console.log(resposta);

                resposta.json().then(json => { // Converte a resposta para JSON
                    sessionStorage.setItem('usuario', JSON.stringify({ // Salva os dados do usuário na sessão
                        id: json.idUsuario,
                        email: json.email,
                        nome: json.nome,
                        fk: json.fkHospital
                    }))

                     // Verifica se é o usuário de suporte
                    if(json.email == "bob.suporte@gmail.com"){
                        setTimeout(function () {
                            cardErro.style.display = "block";
                            cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
                            mensagem_erro.innerHTML =
                            "Login para (suporte) efetuado com sucesso";

                            window.location = "./suporte.html";  // Redireciona para a página de suporte
                        }, 1000);

                    }else{

                        setTimeout(function () {
                            cardErro.style.display = "block";
                            cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
                            mensagem_erro.innerHTML =
                            "Login efetuado com sucesso! Redirecionando para a Dashboard...";

                            window.location = "./dashboard.html";   // Redireciona para a dashboard
                        }, 1000);
                    }


                });

            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                cardErro.style.display = "block";
                cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
                mensagem_erro.innerHTML =
                        "(Usuario inválido) Tente novamente";
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

    }).catch(function (erro) {  // Captura erros da requisição
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}
