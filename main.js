const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const tempoAtual = document.getElementById("tempo-atual");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

function atualizarTempoAtual() {
  const horas = Math.floor(audio.currentTime / 3600);
  const minutos = Math.floor((audio.currentTime % 3600) / 60);
  const segundos = Math.floor(audio.currentTime % 60);
  tempoAtual.innerText = horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
}

function selecionarMinuto(event) {
  const larguraBarra = this.offsetWidth;
  const clickX = event.offsetX;
  const tempoTotal = audio.duration;
  const minutoSelecionado = (clickX / larguraBarra) * tempoTotal / 60;
  audio.currentTime = minutoSelecionado * 60;
}
audio.addEventListener("timeupdate", atualizarTempoAtual);
document.getElementById("barra-progresso").addEventListener("click", selecionarMinuto);


function tocarFaixa() {
  botaoPlayPause.classList.remove("bi-play-circle-fill");
  botaoPlayPause.classList.add("bi-pause-circle-fill");
  audio.play();
  taTocando = true;
}

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
}

botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
audio.addEventListener("ended", proximoCapitulo);
