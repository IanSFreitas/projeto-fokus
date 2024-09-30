const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBotao = document.querySelector('#start-pause');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const imagemPausaComeça = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('sons/play.wav');
const audioPausa = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3')

let intervaloId = null;
let tempoDecorridoSegundos = 1500

musica.loop = true;
musica.volume = 0.2;
audioPlay.volume = 0.2;
audioPausa.volume = 0.2;
audioTempoFinalizado.volume = 0.2;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500
    alterarContexto('foco');
    focoBotao.classList.add('active');
});

curtoBotao.addEventListener('click', () => {
    tempoDecorridoSegundos = 300
    alterarContexto('descanso-curto');
    curtoBotao.classList.add('active');
});

longoBotao.addEventListener('click', () => {
    tempoDecorridoSegundos = 900
    alterarContexto('descanso-longo');
    longoBotao.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
}

startPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    imagemPausaComeça.setAttribute('src', 'imagens/pause.png')
    iniciarOuPausarBotao.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    imagemPausaComeça.setAttribute('src', 'imagens/play_arrow.png')
    iniciarOuPausarBotao.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();