var operandoa;
var operandob;
var operacion;
var state = "off";

function zfill(num, len) {
  return (Array(len).join("0") + num).slice(-len);
}
function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = zfill(now.getHours(), 2);
  let minutes = zfill(now.getMinutes(), 2);
  let seconds = zfill(now.getSeconds(), 2);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()].toUpperCase();
  let year = now.getFullYear();
  let print = document.getElementById("clock");
  print.innerHTML = ` ${day} ${date} ${year}</br>${hours}:${minutes}:${seconds}`;
  print.style.fontSize = "medium";
}

audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var frequency = 648;
var type = "sine";
var volume = 0.5;
var duration = 75;

function beep() {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = type;

  oscillator.start();

  setTimeout(function () {
    oscillator.stop();
  }, duration);
}
function init() {
  //definir las variables//
  var resultado = document.getElementById("resultado");
  var igual = document.getElementById("igual");
  var reset = document.getElementById("reset");
  var reloj = document.getElementById("clock");
  var resultado = document.getElementById("resultado");
  function tecla(e) {
    beep();
    reloj.style.visibility = "hidden";
    resultado.style.visibility = "visible";
    if (resultado.textContent.length > 8) {
      beep();
    } else {
      resultado.textContent = resultado.textContent + e.srcElement.innerText;
    }
  }
  document.querySelectorAll(".numberbutton").forEach((item) => {
    item.addEventListener("click", tecla);
  });

  reset.onclick = function (e) {
    //para limpiar la pantalla
    reloj.style.visibility = "visible";
    resetear();
    beep();
  };
  function teclaop(e) {
    beep();
    operandoa = resultado.textContent; // la tecla que se presione se va a guardar en esta variable
    operacion = e.srcElement.innerText;
    limpiar();
  }
  document.querySelectorAll(".buttonop").forEach((item) => {
    item.addEventListener("click", teclaop);
  });

  igual.onclick = function (e) {
      reloj.style.visibility = "hidden";
      resultado.style.visibility = "visible";
    operandob = resultado.textContent;
    resolver();
    beep();
  };
}

function limpiar() {
  //esta función lo que va a hacer es limpiar (Estableciendolo a vacio)
  resultado.textContent = "";
}

function resetear() {
  //esta función lo que va a hacer es limpiar el panel de resultados
  resultado.textContent = "";
  operandoa = 0;
  operandob = 0;
  operacion = "";
}

function resolver() {
  var res = eval(`${operandoa}${operacion}${operandob}`).toFixed(3);
  resetear();
  if (res.length>10){
      resultado.textContent="too long"
  } else{
  resultado.textContent = res;
  }
}
let clickhora = document.getElementById("button_clock");
clickhora.addEventListener("click", function () {
  formatDate();
  var resultado = document.getElementById("resultado");
  resultado.style.visibility = "hidden";
  var reloj = document.getElementById("clock");
  reloj.style.visibility = "visible";
  var resultado = document.getElementById("resultado");
  resultado.textContent = "";
});
let clickcalc = document.getElementById("button_watch_cal");
clickcalc.addEventListener("click", function () {
  var resultado = document.getElementById("resultado");
  resultado.style.visibility = "visible";
  var reloj = document.getElementById("clock");
  reloj.style.visibility = "hidden";
  var resultado = document.getElementById("resultado");
  resultado.textContent = "";
});
init();
var intervalId = window.setInterval(function () {
  formatDate();
}, 1000);

let button_ligth = document.querySelector("#button_light");
button_ligth.addEventListener("click", function () {
  let display = document.getElementById("displaysmall");
  if (state === "off") {
    state = "on";
    display.style.backgroundColor = "yellow";
    display.style.color = "black";
  } else {
    state = "off";
    display.style.backgroundColor = "rgb(121, 102, 10)";
  }
});
