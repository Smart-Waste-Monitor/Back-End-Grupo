// // Seleciona TODAS as imagens do carousel (classe .slide)
// // Para então virar uma NODE LIST (coleção de objetos para usar o querySelectorALl) com o document (seleciona a tag)
// let slides = document.querySelectorAll(".slide");
// // Seleciona todos os indicadores (que ta como indica, a bolinha!)
// let bolinha = document.querySelectorAll(".indica");
// // É o índice da primeira imagem (que é 0 né)
// let i = 0;



// // Função que avança para o próximo slide
// function nextSlide() {
//     // Aumenta o meu indice
//     i++;
//     // Ve se passou da última imagem para então voltar a primeira
//     if (i >= slides.length) {
//         // O loop ai
//         i = 0;
//     }
//     // Mostra o slide atual invocando a função
//     showSlide(i);
// }

// // Executa a função nextSlide a cada 3 segundos, que é 3000 ms em JS
// // Ai fica parecendo que é automatico
// setInterval(nextSlide, 4000);

// // Função que mostra o slide
// function showSlide(i) {

//     // Remove a classe "active" de TODAS as imagens
//     slides.forEach(slide => slide.classList.remove("active"));

//     // Faz o mesmo que nas imagens só que com as bolinhas
//     bolinha.forEach(indica => indica.classList.remove("active"));

//     // Adiciona "active" SOMENTE na imagem atual (se baseando no indice)
//     // Isso faz ela aparecer (por causa do CSS e JS)
//     slides[i].classList.add("active");
//     // Ativa também a bolinha 
//     bolinha[i].classList.add("active");
// }

let slides = document.querySelectorAll(".slide");
let bolinha = document.querySelectorAll(".indica");
let i = 0;

function nextSlide() {
    i++;
    if (i >= slides.length) {
        i = 0;
    }
    showSlide(i);
}

setInterval(nextSlide, 4000);

function showSlide(i) {
    // Remove "active" de todos os slides
    for (let j = 0; j < slides.length; j++) {
        slides[j].classList.remove("active");
    }

    // Remove "active" de todos os bolinha
    for (let j = 0; j < bolinha.length; j++) {
        bolinha[j].classList.remove("active");
    }

    // Ativa o slide atual
    slides[i].classList.add("active");

    // Ativa o dot atual
    bolinha[i].classList.add("active");
}