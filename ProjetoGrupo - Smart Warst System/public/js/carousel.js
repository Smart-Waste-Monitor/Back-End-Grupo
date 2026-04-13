// Seleciona TODAS as imagens do carousel (classe .slide)
// Para então virar uma NODE LIST (coleção de objetos para usar o querySelectorALl) com o document (seleciona a tag)
let slides = document.querySelectorAll(".slide");
// Seleciona todos os indicadores (que ta como indica, a bolinha!)
let dots = document.querySelectorAll(".indica");
// É o índice da primeira imagem (que é 0 né)
let index = 0;

// Função que avança para o próximo slide
function nextSlide() {
    // Aumenta o meu indice
    index++;
    // Ve se passou da última imagem para então voltar a primeira
    if (index >= slides.length) {
        // O loop ai
        index = 0;
    }
    // Mostra o slide atual invocando a função
    showSlide(index);
}
// Executa a função nextSlide a cada 3 segundos, que é 3000 ms em JS
// Ai fica parecendo que é automatico
setInterval(nextSlide, 3000);

// Função que mostra o slide
function showSlide(i) {

    // Remove a classe "active" de TODAS as imagens
    slides.forEach(slide => slide.classList.remove("active"));

    // Faz o mesmo que nas imagens só que com as bolinhas
    dots.forEach(indica => indica.classList.remove("active"));

    // Adiciona "active" SOMENTE na imagem atual (se baseando no indice)
    // Isso faz ela aparecer (por causa do CSS e JS)
    slides[i].classList.add("active");
    // Ativa também a bolinha 
    dots[i].classList.add("active");
}
