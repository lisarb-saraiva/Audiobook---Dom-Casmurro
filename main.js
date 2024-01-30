const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

function tocarFaixa() {
botaoPlayPause.classList.remove("bi-play-circle-fill");
botaoPlayPause.classList.add("bi-pause-circle-fill");
audio.play();
taTocando = true;
audio.addEventListener("timeupdate", function() {
    const tempoAtual = audio.currentTime;
    const horas = Math.floor(tempoAtual / 3600);
    const minutos = Math.floor((tempoAtual % 3600) / 60);
    const segundos = Math.floor(tempoAtual % 60);
    const tempoFormatado = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
    const duracaoTotal = audio.duration;
    const porcentagem = (tempoAtual / duracaoTotal) * 100;
    document.getElementById("barra-tempo").value = porcentagem;
    document.getElementById("tempo-atual").innerText = tempoFormatado;
  });
}

document.getElementById("barra-tempo").addEventListener("input", function() {
    const porcentagem = this.value;
    const duracaoTotal = audio.duration;
    const novoTempo = (porcentagem / 100) * duracaoTotal;
    audio.currentTime = novoTempo;
  });

function pausarFaixa() {
botaoPlayPause.classList.add("bi-play-circle-fill");
botaoPlayPause.classList.remove("bi-pause-circle-fill");
audio.pause();
taTocando = false;
}

function tocarOuPausarFaixa() {
if (taTocando === true) {
pausarFaixa();
} else {
tocarFaixa();
}
}

function capituloAnterior() {
if (capitulo === 1) {
capitulo = quantidadeCapitulos;
} else {
capitulo -= 1;
}
audio.src = "books/dom-casmurro/" + capitulo + ".mp3";
nomeCapitulo.innerText = "Capítulo " + capitulo;
tocarFaixa();
document.getElementById("barra-tempo").value = 0;
}

function proximoCapitulo() {
if (capitulo < quantidadeCapitulos) {
capitulo += 1;
} else {
capitulo = 1;
}
audio.src = "books/dom-casmurro/" + capitulo + ".mp3";
nomeCapitulo.innerText = "Capítulo " + capitulo;
tocarFaixa();
document.getElementById("barra-tempo").value = 0;
}

botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
audio.addEventListener("ended", proximoCapitulo);

