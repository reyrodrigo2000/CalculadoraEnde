document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calcularYMostrarTarifa();
  }
});

function calcularYMostrarTarifa() {
  var lecturaAnteriorInput = document.getElementById("lectura_anterior");
  var lecturaActualInput = document.getElementById("lectura_actual");

  var lecturaAnterior = parseFloat(lecturaAnteriorInput.value);
  var lecturaActual = parseFloat(lecturaActualInput.value);

  var consumoKwh = lecturaActual - lecturaAnterior;

  var tarifaConsumo = calcularTarifa(consumoKwh);
  var tasaAlumbrado = tarifaConsumo * 0.1382;
  var tarifaAseo = calcularTarifaAseo(consumoKwh);
  var total = tarifaConsumo + tasaAlumbrado + tarifaAseo;

  document.getElementById("consumo_kwh").textContent = consumoKwh.toFixed(2) + " kWh";
  document.getElementById("tarifa_consumo").textContent = tarifaConsumo.toFixed(2);
  document.getElementById("tasa_alumbrado").textContent = tasaAlumbrado.toFixed(2);
  document.getElementById("tarifa_aseo").textContent = tarifaAseo.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);

  document.getElementById("resultados").style.display = "table";
}

function calcularTarifa(kwh) {
  var tarifas = [0.656, 0.761, 0.891, 0.971, 1.372];
  var rangos = [20, 100, 200, 500, 1000];
  var tarifa = 11.275;
  
  for (var i = 0; i < rangos.length; i++) {
    if (kwh > rangos[i]) {
      tarifa += (Math.min(kwh, rangos[i + 1] || kwh) - rangos[i]) * tarifas[i];
    }
  }
  
  return tarifa;
}

function calcularTarifaAseo(kwh) {
  var tarifas = [5, 10, 18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100];
  var rangos = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900];
  
  for (var i = 0; i < rangos.length; i++) {
    if (kwh <= rangos[i]) {
      return tarifas[i];
    }
  }
  
  return 150;
}
