document.getElementById("btnCalcular").addEventListener("click", calcular);
document.getElementById("btnCopiar").addEventListener("click", copiarResultado);
document.getElementById("btnWhatsapp").addEventListener("click", compartirWhatsApp);
document.getElementById("btnNuevo").addEventListener("click", limpiarFormulario);
document.getElementById("toggleTema").addEventListener("change", function() {
  document.body.setAttribute("data-theme", this.checked ? "oscuro" : "claro");
});

function calcular() {
  const años = parseFloat(document.getElementById("años").value) || 0;
  const meses = parseFloat(document.getElementById("meses").value) || 0;
  const fraccionStr = document.getElementById("fraccion").value;
  const operacion = document.getElementById("operacion").value;

  const totalAnios = años + (meses / 12);
  const [num, den] = fraccionStr.split("/").map(Number);
  const fraccion = num / den;

  let resultado = operacion === "restar"
    ? totalAnios * (1 - fraccion)
    : totalAnios * (1 + fraccion);

  const totalDias = resultado * 365.25;
  let añosEnteros = Math.floor(totalDias / 365.25);
  let diasRestantes = totalDias - añosEnteros * 365.25;
  let mesesCalc = Math.floor(diasRestantes / 30.44);
  let dias = Math.round(diasRestantes - mesesCalc * 30.44);

  if (dias >= 30) {
    dias = 0;
    mesesCalc += 1;
  }
  if (mesesCalc >= 12) {
    mesesCalc -= 12;
    añosEnteros += 1;
  }

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado:</strong><br><b>${añosEnteros} años, ${mesesCalc} meses, ${dias} días</b>`;
}

function copiarResultado() {
  const texto = document.getElementById("resultado").innerText.trim();
  if (!texto) return alert("No hay resultado para copiar.");
  navigator.clipboard?.writeText(texto).then(() =>
    alert("Resultado copiado al portapapeles.")
  ).catch(() => {
    const temp = document.createElement("textarea");
    temp.value = texto;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Resultado copiado (método alternativo).");
  });
}

function compartirWhatsApp() {
  const texto = document.getElementById("resultado").innerText.trim();
  if (!texto) return alert("No hay resultado para compartir.");
  const mensaje = encodeURIComponent("🧮 Resultado del Fraccionador de años, cortesía de Víctor Siu:\n\n" + texto);
  window.open(`https://wa.me/?text=${mensaje}`, '_blank');
}

function limpiarFormulario() {
  document.getElementById("años").value = "";
  document.getElementById("meses").value = "";
  document.getElementById("resultado").innerHTML = "";
}