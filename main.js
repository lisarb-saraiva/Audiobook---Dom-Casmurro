const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const tempoAtual = document.getElementById("tempo-atual");
const barraProgresso = document.getElementById("barra-progresso");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

function atualizarTempoAtual() {
  const horas = Math.floor(audio.currentTime / 3600);
  const minutos = Math.floor((audio.currentTime % 3600) / 60);
  const segundos = Math.floor(audio.currentTime % 60);
  tempoAtual.innerText = horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
  
  const porcentagemProgresso = (audio.currentTime / audio.duration) * 100;
  barraProgresso.value = porcentagemProgresso;
}

function selecionarMinuto(event) {
  const larguraBarra = this.offsetWidth;
  const clickX = event.offsetX;
  const porcentagemSelecionada = (clickX / larguraBarra) * 100;
  const tempoTotal = audio.duration;
  const tempoSelecionado = (porcentagemSelecionada / 100) * tempoTotal;
  audio.currentTime = tempoSelecionado;
}

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
barraProgresso.addEventListener("input", selecionarMinuto);
audio.addEventListener("timeupdate", atualizarTempoAtual);

