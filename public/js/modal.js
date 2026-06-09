const modal = document.getElementById("minhaModal");
const botaoAbrir = document.getElementById("abrirModal");

function modalRadioativo() {
  // Monta a lista de lixeiras radioativas com volume > 0
  let lista = "";

  for (let i = 0; i < buscar1.length; i++) {
    let lixeira = buscar1[i];

    // Pula se não for radioativa
    if (!lixeira.tipo_residuo.includes("Radioativo")) continue;

    // Pula se volume for 0
    if (lixeira.volume_percentual <= 0) continue;

    // Calcula tempo desde a última medição
    let agora = new Date();
    let dataMedicao = new Date(lixeira.ultima_medicao);
    let diferencaMin = Math.floor((agora - dataMedicao) / 1000 / 60);
    let horas = Math.floor(diferencaMin / 60);
    let minutos = diferencaMin % 60;

    let tempoTexto = "";

    if (horas > 0) {
      tempoTexto = horas + "h " + minutos + "min";
    } else {
      tempoTexto = diferencaMin + " minutos";
    }
    lista += `
            <div class="modal-lixeira-card">
                <strong>${lixeira.nome_lixeira}</strong>
                <p>Volume: ${lixeira.volume_percentual.toFixed(2)}%</p>
                <p>Última medição: ${dataMedicao.toLocaleString("pt-BR")}</p>
                <p>Com volume há aproximadamente ${tempoTexto}</p>
            </div>
        `;
  }

  // Se não encontrou nenhuma, mostra mensagem
  if (lista === "") {
    lista = "<p>Nenhuma lixeira radioativa com volume detectado.</p>";
  }

  modal.innerHTML = `
        <div class="modal">
            <button onclick="fecharModal()">Fechar</button>
            <h2>Lixeiras Radioativas</h2>
            ${lista}
        </div>
    `;

  modal.showModal();
}

function modalQuimicos() {
  // Monta a lista de lixeiras radioativas com volume > 0
  let lista = "";

  for (let i = 0; i < buscar1.length; i++) {
    let lixeira = buscar1[i];

    // Pula se não for radioativa
    if (!lixeira.tipo_residuo.includes("Químico")) continue;

    // Pula se volume for 0
    if (lixeira.volume_percentual <= 0) continue;

    // Calcula tempo desde a última medição
    let agora = new Date();
    let dataMedicao = new Date(lixeira.ultima_medicao);
    let diferencaMin = Math.floor((agora - dataMedicao) / 1000 / 60);
    let horas = Math.floor(diferencaMin / 60);
    let minutos = diferencaMin % 60;

    let tempoTexto = "";

    if (horas > 0) {
      tempoTexto = horas + "h " + minutos + "min";
    } else {
      tempoTexto = diferencaMin + " minutos";
    }
    lista += `
            <div class="modal-lixeira-card">
                <strong>${lixeira.nome_lixeira}</strong>
                <p>Volume: ${lixeira.volume_percentual.toFixed(2)}%</p>
                <p>Última medição: ${dataMedicao.toLocaleString("pt-BR")}</p>
                <p>Com volume há aproximadamente ${tempoTexto}</p>
            </div>
        `;
  }

  // Se não encontrou nenhuma, mostra mensagem
  if (lista === "") {
    lista = "<p>Nenhuma lixeira química com volume detectado.</p>";
  }

  modal.innerHTML = `
        <div class="modal">
            <button onclick="fecharModal()">Fechar</button>
            <h2>Lixeiras Químicas</h2>
            ${lista}
        </div>
    `;

  modal.showModal();
}

function fecharModal() {
  modal.close();
  modal.innerHTML = "";
}
