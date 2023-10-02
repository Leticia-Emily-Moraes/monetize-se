var ul = document.querySelector('nav ul');
var menuBtn = document.getElementById('MenuHam');

function MostrarMenu(){
    if (ul.classList.contains('open')){
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}
const slider = document.getElementById('slider');
const slide = document.querySelectorAll('.slide');
const indicadores = document.querySelectorAll('.indicador');
const setaAnterior = document.getElementById('seta-anterior');
const setaProxima = document.getElementById('seta-proxima');
let currentIndex = 0;
let interval;


function criarIndicadores() {
    slide.forEach((_, index) => {
        const indicador = document.createElement('span');
        indicador.classList.add('indicador');
        if (index === 0) {
            indicador.classList.add('ativo'); // Adicionar 'ativo' ao primeiro indicador
        }
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

function atualizarSlider() {
    const slideWidth = slide[0].clientWidth;
    slider.style.transform = `translateX(-${currentIndex * (slideWidth + 20)}px)`;
    atualizarIndicadores();
}

function slidePara(index) {
    currentIndex = index;
    atualizarSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slide.length;
    atualizarSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slide.length) % slide.length;
    atualizarSlider();
}

setaAnterior.addEventListener('click', () => {
    prevSlide();
    clearInterval(interval);
    interval = setInterval(nextSlide, 10000);
});

setaProxima.addEventListener('click', () => {
    nextSlide();
    clearInterval(interval);
    interval = setInterval(nextSlide, 10000);
});

criarIndicadores();

// Adicione uma verificação para rolagem infinita
interval = setInterval(() => {
    nextSlide();
    if (currentIndex === slide.length - 1) {
        setTimeout(() => {
            currentIndex = 0;
            atualizarSlider();
        }, 500); // Atraso para criar um efeito suave de rolagem infinita
    }
}, 10000);

var map = L.map('map').setView([-23.694801249005703, -46.54852195767105], 13);

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
