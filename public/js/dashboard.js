let buscar1 = [];
function lixeirasGeraisBusca() {
    fetch("/dash/lixeirasGerais", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Houve um erro ao tentar realizar a consulta!";
            }
        })
        .then(function (dados) {
            buscar1 = dados;
            console.log(buscar1)
            lixeirasContainer.innerHTML = '';
            let contarCheio = 0;
            let contarQuimico = 0;
            let contarYellow = 0;
            let contarVazio = 0;
            for (let i = 0; i < buscar1.length; i++) {
                let distancia = buscar1[i].volume_percentual.toFixed(2)


                let imagem = '';
                if (buscar1[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar1[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar1[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar1[i].tipo_residuo.includes('Químico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if (imagem == 'imgs/imgPorTipo/lixoRadioativo.png') {
                    classe = 'lixeira-card red'
                    distancia = 'Urgente'
                }
                else if (distancia >= 75) {
                    classe = 'lixeira-card red'
                    distancia = `Volume: ${distancia}%`
                } else if (distancia >= 50) {
                    classe = 'lixeira-card yellow'
                    distancia = `Volume: ${distancia}%`
                } else {
                    classe = 'lixeira-card'
                    distancia = `Volume: ${distancia}%`
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}" onclick="graficoEspecifico(this)">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar1[i].nome_lixeira}</h3>
                            <p>${distancia}</p>
                        </div>
                    </div>
                `;

                if (classe == 'lixeira-card red' && imagem == 'imgs/imgPorTipo/lixoRadioativo.png') {
                    contarQuimico++;
                }

                if (classe == 'lixeira-card red') {
                    contarCheio++;
                } else if (classe == 'lixeira-card') {
                    contarVazio++;
                }else{
                    contarYellow++;
                }
            }
            valorCheio.innerHTML = contarCheio;
            valorVazio.innerHTML = contarVazio;
            valorCheioYellow.innerHTML = contarYellow;
            console.log(contarQuimico);
            if (contarQuimico > 0) {
                valorQuimicoCheia.innerHTML = `Quantidade: ${contarQuimico}`;
                kpi.classList.add('red');
            } else {
                valorQuimicoCheia.innerHTML = `Nenhuma Cheia`
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
lixeirasGeraisBusca();

let buscar2 = [];
function filtrarAlertas() {
    fetch("/dash/lixeirasAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Houve um erro ao tentar realizar a consulta!";
            }
        })
        .then(function (dados) {
            buscar2 = dados;
            console.log(buscar2)
            lixeirasContainer.innerHTML = '';
            for (let i = 0; i < buscar2.length; i++) {
                let distancia = buscar2[i].volume_percentual.toFixed(2)


                let imagem = '';
                if (buscar2[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar2[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar2[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar2[i].tipo_residuo.includes('Químico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if (imagem == 'imgs/imgPorTipo/lixoRadioativo.png') {
                    classe = 'lixeira-card red'
                    distancia = 'Urgente'
                }
                else if (distancia >= 75) {
                    classe = 'lixeira-card red'
                    distancia = `Volume: ${distancia}%`
                } else if (distancia >= 50) {
                    classe = 'lixeira-card yellow'
                    distancia = `Volume: ${distancia}%`
                } else {
                    classe = 'lixeira-card'
                    distancia = `Volume: ${distancia}%`
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}" onclick="graficoEspecifico(this)">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar2[i].nome_lixeira}</h3>
                            <p>${distancia}</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

let buscar3 = [];
function filtrarCriticos() {
    fetch("/dash/lixeirasCriticas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Houve um erro ao tentar realizar a consulta!";
            }
        })
        .then(function (dados) {
            buscar3 = dados;
            console.log(buscar3)
            lixeirasContainer.innerHTML = '';
            for (let i = 0; i < buscar3.length; i++) {
                let distancia = buscar3[i].volume_percentual.toFixed(2)


                let imagem = '';
                if (buscar3[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar3[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar3[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar3[i].tipo_residuo.includes('Químico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if (imagem == 'imgs/imgPorTipo/lixoRadioativo.png') {
                    classe = 'lixeira-card red'
                    distancia = 'Urgente'
                }
                else if (distancia >= 75) {
                    classe = 'lixeira-card red'
                    distancia = `Volume: ${distancia}%`
                } else if (distancia >= 50) {
                    classe = 'lixeira-card yellow'
                    distancia = `Volume: ${distancia}%`
                } else {
                    classe = 'lixeira-card'
                    distancia = `Volume: ${distancia}%`
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}" onclick="graficoEspecifico(this)">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar3[i].nome_lixeira}</h3>
                            <p>${distancia}</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

let buscar4 = []
function graficoEspecifico(elemento) {

    fetch("/dash/graficoEspec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Houve um erro ao tentar realizar a consulta!";
            }
        })
        .then(function (dados) {
            buscar4 = dados;
            console.log(buscar4)

            // Peguei o elemento a partir de um "evento"
            let nomeLixeira = elemento.querySelector('h3').innerText;
            let volume = elemento.querySelector('p').innerText;

            console.log(nomeLixeira);
            console.log(volume);
            let salvar = [];
            let labels = []
            for (let i = 0; i < buscar4.length; i++) {
                if (buscar4[i].nome_lixeira == nomeLixeira) {
                    salvar.push(buscar4[i].volume_percentual)
                    let dataStr = buscar4[i].data_medicao.toString().substring(0, 16); // "2024-01-15T06:00" é como pego tlgd
                    let partes = dataStr.split("T"); // ["2024-01-15", "06:00"] fica essa coisa ai por exemplo
                    // Caso queira usar o dia também só descomentar abaixo
                    // let dataParts = partes[0].split("-"); // ["2024", "01", "15"]
                    // let dataFormatada = dataParts[2] + "/" + dataParts[1] + " " + partes[1]; // "15/01 06:00" é o resultado final
                    let dataFormatada = partes[1]; // "06:00"
                    labels.push(dataFormatada);
                }
            }

            atualizarGrafico(salvar, nomeLixeira, labels)
            console.log(salvar)
            console.log(labels)

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


let buscar5 = [];
function filtroSelect() {
    let filtroVar = selecao.value
    if (filtroVar == 1) {
        filtroVar = 'Radioativo'
    } else if (filtroVar == 2) {
        filtroVar = 'Infectante'
    } else if (filtroVar == 3) {
        filtroVar = 'Químico'
    } else if (filtroVar == 4) {
        filtroVar = 'Perfurocortante'
    } else {
        filtroVar = 'Comum'
    }
    console.log(filtroVar)
    fetch("/dash/graficoFiltrado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filtroServer: filtroVar,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Houve um erro ao tentar realizar a consulta!";
            }
        })
        .then(function (dados) {
            buscar5 = dados;
            console.log(buscar5);
            atualizarGraficoFiltrado(buscar5);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}   