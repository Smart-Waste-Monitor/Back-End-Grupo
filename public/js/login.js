
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
                            window.location = "./suporte.html";
                        }, 1000);    
                    }else{
                    setTimeout(function () {
                        window.location = "./dashboard.html";
                    }, 1000); // apenas para exibir o loading
                    }


                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

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
