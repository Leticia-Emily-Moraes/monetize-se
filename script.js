const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
const indicadores = document.querySelectorAll('.indicadores');
const setaAnterior = document.querySelector('.seta-anterior');
const setaProxima = document.querySelector('.seta-proxima');

let currentIndex = 0;

function criarIndicadores() {
    slide.forEach((_, index) => {
        const indicador = document.createElement('span');
        indicador.classList.add('indicador');
        indicador.addEventListener('click', () => slidePara(index));
        document.querySelector('.indicadores').appendChild(indicador);
    });
}

function atualizarIndicadores() {
    const indicadoresArray = Array.from(document.querySelectorAll('.indicador'));
    indicadoresArray.forEach((indicador, index) => {
        if (index === currentIndex) {
            indicador.classList.add('ativo');
        } else {
            indicador.classList.remove('ativo');
        }
    });
}

function atualizarslider() {
    const slideWidth = slide[0].clientWidth;
    slider.style.transform = `translateX(-${currentIndex * (slideWidth + 20)}px)`;
    atualizarIndicadores()
}

function slidePara(index) {
    currentIndex = index;
    atualizarslider()
}

setaAnterior.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slide.length) % slide.length;
    atualizarslider()
});

setaProxima.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slide.length;
    atualizarslider()
});

criarIndicadores();
atualizarslider()