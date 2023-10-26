var ul = document.querySelector('nav ul');
var menuBtn = document.getElementById('MenuHam');
var container = document.getElementById('container');

function MostrarMenu() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
        container.style.zIndex = 0;
    } else {
        ul.classList.add('open');
        container.style.zIndex = -10;
    }
}
menuBtn.addEventListener('click', () => {
    MostrarMenu();
});


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

inicializarMapa();
function inicializarMapa() {
    var mapOptions = {
        center: { lat: -23.69147, lng: -46.54886 },
        zoom: 15
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var coordenadas = { lat: -23.69147, lng: -46.54886 };

    var marker = new google.maps.Marker({
        position: coordenadas,
        map: map,
        title: "Condomínio Domo Business"
    });
    var infoWindow = new google.maps.InfoWindow({
        content: "Monetize-se"
      });

      // Adicionar evento de clique no marcador
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
}

document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll("#filtro input[type=checkbox]");
    const temaElements = document.querySelectorAll(".temaM");

    filters.forEach(filter => {
        filter.addEventListener("change", updateVisibility);
    });

    function updateVisibility() {
        const selecionados = Array.from(filters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        temaElements.forEach(element => {
            if (selecionados.length === 0 || selecionados.includes(element.textContent)) {
                element.parentElement.style.display = "";
            } else {
                element.parentElement.style.display = "none";
            }
        });
    }
});
