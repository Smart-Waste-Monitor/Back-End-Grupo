
function entrar() {

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    }
    else {
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
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

                resposta.json().then(json => {
                    sessionStorage.setItem('usuario', JSON.stringify({ // Cria objeto json para verificar
                        id: json.idUsuario,
                        email: json.email,
                        nome: json.nome,
                        fk: json.fkHospital
                    }))

                    if(json.email == "bob.suporte@gmail.com"){
                        setTimeout(function () {
                        cardErro.style.display = "block";
                        cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
                        mensagem_erro.innerHTML =
                        "Login para (suporte) efetuado com sucesso";
                            window.location = "./suporte.html";
                        }, 1000);    
                    }else{
                    setTimeout(function () {
                        cardErro.style.display = "block";
                        cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
                        mensagem_erro.innerHTML =
                        "Login efetuado com sucesso! Redirecionando para a Dashboard...";
                        window.location = "./dashboard.html";
                    }, 1000); // apenas para exibir o loading
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

    }).catch(function (erro) {
                console.log(erro);
            })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}
