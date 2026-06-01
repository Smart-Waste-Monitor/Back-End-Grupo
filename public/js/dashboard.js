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
            for (let i = 0; i < buscar1.length; i++) {
                let distancia = buscar1[i].volume_percentual
                
                let imagem = '';
                if (buscar1[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar1[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar1[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar1[i].tipo_residuo.includes('Quimico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if(distancia >= 75){
                    classe = 'lixeira-card red'
                }else if(distancia >= 50){
                    classe = 'lixeira-card yellow'
                }else {
                    classe = 'lixeira-card'
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar1[i].nome_lixeira}</h3>
                            <p>Volume: ${distancia.toFixed(2)}%</p>
                        </div>
                    </div>
                `;
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
                let distancia = buscar2[i].volume_percentual
                
                let imagem = '';
                if (buscar2[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar2[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar2[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar2[i].tipo_residuo.includes('Quimico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if(distancia >= 75){
                    classe = 'lixeira-card red'
                }else if(distancia >= 50){
                    classe = 'lixeira-card yellow'
                }else {
                    classe = 'lixeira-card'
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar2[i].nome_lixeira}</h3>
                            <p>Volume: ${distancia.toFixed(2)}%</p>
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
                let distancia = buscar3[i].volume_percentual
                
                let imagem = '';
                if (buscar3[i].tipo_residuo.includes('Comum')) {
                    imagem = 'imgs/imgPorTipo/lixoComum.png'
                } else if (buscar3[i].tipo_residuo.includes('Infectante')) {
                    imagem = 'imgs/imgPorTipo/lixoBiologico.png'
                } else if (buscar3[i].tipo_residuo.includes('Perfurocortante')) {
                    imagem = 'imgs/imgPorTipo/lixoPerfurante.png'
                } else if (buscar3[i].tipo_residuo.includes('Quimico')) {
                    imagem = 'imgs/imgPorTipo/lixoQuimico.png'
                } else {
                    imagem = 'imgs/imgPorTipo/lixoRadioativo.png'
                }
                let classe = '';
                if(distancia >= 75){
                    classe = 'lixeira-card red'
                }else if(distancia >= 50){
                    classe = 'lixeira-card yellow'
                }else {
                    classe = 'lixeira-card'
                }

                lixeirasContainer.innerHTML += `
                    <div class="${classe}">
                        <div class="lixeiraIcone"><img src="${imagem}"></div>
                        <div class="lixeiraInfo">
                            <h3>${buscar3[i].nome_lixeira}</h3>
                            <p>Volume: ${distancia.toFixed(2)}%</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
