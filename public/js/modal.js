const modal = document.getElementById('minhaModal');
const botaoAbrir = document.getElementById('abrirModal');

function modalQuimicos() {

    minhaModal.innerHTML = `
        <div class="modal">
            <button onclick="fecharModal()">Fechar</button>

            <h2>Informações dos lixos quimicos</h2>
            <p>Aqui vai uma lista de lixeiras</p>
        <div>
    `;

    modal.showModal();
}

function fecharModal(){
    modal.close();
};