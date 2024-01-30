const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const tempoAtual = document.getElementById("tempo-atual");
const barraProgresso = document.getElementById("barra-progresso");
const tempoTotal = document.getElementById("tempo-total");
const audio = new Audio("/books");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

audio.addEventListener("loadedmetadata", function() {
  duracaoTotal = audio.duration;
  tempoTotal.innerText = formatarTempo(duracaoTotal);
  atualizarBarraProgresso();
});

audio.addEventListener("timeupdate", function() {
  tempoSelecionado = audio.currentTime;
  atualizarTempoAtual();
  atualizarBarraProgresso();
});

barraProgresso.addEventListener("input", function() {
  const porcentagemSelecionada = barraProgresso.value;
  tempoSelecionado = (porcentagemSelecionada / 100) * duracaoTotal;
  audio.currentTime = tempoSelecionado;
  atualizarTempoAtual();
});

function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosFormatados = Math.floor(segundos % 60);
  return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundosFormatados.toString().padStart(2, "0")}`;
}

function atualizarBarraProgresso() {
  const porcentagemProgresso = (tempoSelecionado / duracaoTotal) * 100;
  barraProgresso.value = porcentagemProgresso;
}

function atualizarTempoAtual() {
  tempoAtual.innerText = formatarTempo(tempoSelecionado);
}

function selecionarTempo() {
  const porcentagemSelecionada = barraProgresso.value;
  tempoSelecionado = (porcentagemSelecionada / 100) * duracaoTotal;
  atualizarTempoAtual();
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
barraProgresso.addEventListener("input", selecionarTempo);

tempoTotal.innerText = formatarTempo(duracaoTotal);
atualizarBarraProgresso();
atualizarTempoAtual();
audio.addEventListener("timeupdate", atualizarTempoAtual);
audio.addEventListener("ended", function() {
  // Ação a ser executada quando o áudio terminar de ser reproduzido
});

