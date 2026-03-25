    // Al cargar la página, recupera datos guardados en LocalStorage
    window.onload = function () {
      let correo = localStorage.getItem('correo');
      let nombre = localStorage.getItem('nombre');
      let fechaNac = localStorage.getItem('fechaNac');
      let salario = localStorage.getItem('salario');
      let tasa = localStorage.getItem('tasa');
      let plazo = localStorage.getItem('plazo');
      let valorVivienda = localStorage.getItem('valorVivienda');
      let montoSolicitar = localStorage.getItem('montoSolicitar');

      if (correo) document.getElementById('inputCorreo').value = correo;
      if (nombre) document.getElementById('inputNombre').value = nombre;
      if (fechaNac) document.getElementById('inputFechaNac').value = fechaNac;
      if (salario) document.getElementById('inputSalario').value = salario;
      if (tasa) document.getElementById('inputTasa').value = tasa;
      if (plazo) {
        document.getElementById('inputPlazo').value = plazo;
        document.getElementById('labelPlazo').innerText = plazo;
      }
      if (valorVivienda) document.getElementById('inputValorVivienda').value = valorVivienda;
      if (montoSolicitar) document.getElementById('inputMontoSolicitar').value = montoSolicitar;
    }

    // Calcula automáticamente el 80% del valor de la vivienda
    function calcularMaxMonto() {
      let inputValorVivienda = document.getElementById('inputValorVivienda');
      let valorVivienda = parseFloat(inputValorVivienda.value);
      if (!isNaN(valorVivienda)) {
        let montoMax = valorVivienda * 0.80;
        document.getElementById('inputMontoSolicitar').value = montoMax.toFixed(2);
      }
    }

    // Función de interés proporcionada en el enunciado
    function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {
      var vInteres = 0;
      var amortiza = montoSolicitado;

      for (var i = 1; i <= mes; i++) {
        vInteres = (amortiza * (tasaMensual / 100));
        amortiza = amortiza - (pagoMensual - vInteres);
      }
      return vInteres;
    }

    // Botón Calcular
    function calcular() {
      let inputCorreo = document.getElementById('inputCorreo');
      let inputNombre = document.getElementById('inputNombre');
      let inputFechaNac = document.getElementById('inputFechaNac');
      let inputSalario = document.getElementById('inputSalario');
      let inputTasa = document.getElementById('inputTasa');
      let inputPlazo = document.getElementById('inputPlazo');
      let inputValorVivienda = document.getElementById('inputValorVivienda');
      let inputMontoSolicitar = document.getElementById('inputMontoSolicitar');

      let salario = parseFloat(inputSalario.value);
      let tasaAnual = parseFloat(inputTasa.value);
      let plazoAnios = parseInt(inputPlazo.value);
      let valorVivienda = parseFloat(inputValorVivienda.value);
      let montoSolicitado = parseFloat(inputMontoSolicitar.value);

      // Validación básica
      if (isNaN(salario) || isNaN(tasaAnual) || isNaN(plazoAnios) || isNaN(valorVivienda) || isNaN(montoSolicitado)) {
        alert('Por favor complete todos los campos numéricos.');
        return;
      }

      // Validar que el monto no supere el 80% del valor de la vivienda
      if (montoSolicitado > valorVivienda * 0.80) {
        alert('El monto a solicitar no puede superar el 80% del valor de la vivienda.');
        return;
      }

      // Cálculo del pago mensual
      // tm = tasa mensual (ya en porcentaje, NO dividir entre 100 aquí)
      let tm = tasaAnual / 12;        // tasa mensual en %
      let p = plazoAnios * 12;        // plazo en meses
      let tmDecimal = tm / 100;       // tasa mensual en decimal para la fórmula

      let pagoMensual = montoSolicitado * (tmDecimal * Math.pow(1 + tmDecimal, p)) / (Math.pow(1 + tmDecimal, p) - 1);

      // Salario mínimo requerido
      let salarioMinRequerido = pagoMensual / 0.40;

      // Porcentaje a financiar
      let porcentajeFinanciar = (montoSolicitado / valorVivienda) * 100;

      // Cargar resultados en los inputs
      document.getElementById('inputPagoMensual').value = pagoMensual.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('inputSalarioMinRequerido').value = salarioMinRequerido.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('inputPorcentajeFinanciar').value = porcentajeFinanciar.toFixed(0) + '%';

      // Etiqueta de salario suficiente o insuficiente
      let labelSalario = document.getElementById('labelSalario');
      if (salario >= salarioMinRequerido) {
        labelSalario.className = 'alert alert-success';
        labelSalario.innerText = 'Monto de salario suficiente para el crédito';
      } else {
        labelSalario.className = 'alert alert-danger';
        labelSalario.innerText = 'Monto de salario insuficiente';
      }

      // Etiqueta de edad
      let labelEdad = document.getElementById('labelEdad');
      let fechaNac = new Date(inputFechaNac.value);
      let hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      let diffMes = hoy.getMonth() - fechaNac.getMonth();
      if (diffMes < 0 || (diffMes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
      }

      if (edad > 22 && edad < 55) {
        labelEdad.className = 'alert alert-success';
        labelEdad.innerText = 'Cliente con edad suficiente para crédito';
      } else {
        labelEdad.className = 'alert alert-danger';
        labelEdad.innerText = 'Cliente no califica para crédito por edad';
      }

      // Mostrar sección de resultados
      document.getElementById('divResultados').classList.remove('d-none');

      // Guardar datos en LocalStorage
      localStorage.setItem('correo', inputCorreo.value);
      localStorage.setItem('nombre', inputNombre.value);
      localStorage.setItem('fechaNac', inputFechaNac.value);
      localStorage.setItem('salario', inputSalario.value);
      localStorage.setItem('tasa', inputTasa.value);
      localStorage.setItem('plazo', inputPlazo.value);
      localStorage.setItem('valorVivienda', inputValorVivienda.value);
      localStorage.setItem('montoSolicitar', inputMontoSolicitar.value);
    }

    // Botón Mostrar Proyección
    function mostrarProyeccion() {
      let tasaAnual = parseFloat(document.getElementById('inputTasa').value);
      let plazoAnios = parseInt(document.getElementById('inputPlazo').value);
      let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitar').value);

      if (isNaN(tasaAnual) || isNaN(plazoAnios) || isNaN(montoSolicitado)) {
        alert('Primero presione Calcular para obtener los datos.');
        return;
      }

      let tm = tasaAnual / 12;          // tasa mensual en %
      let p = plazoAnios * 12;          // plazo en meses
      let tmDecimal = tm / 100;

      let pagoMensual = montoSolicitado * (tmDecimal * Math.pow(1 + tmDecimal, p)) / (Math.pow(1 + tmDecimal, p) - 1);

      // Construir la tabla HTML
      let tabla = '<h5 class="title-d">Proyección de Crédito</h5>';
      tabla += '<div class="table-responsive">';
      tabla += '<table class="table table-striped table-bordered">';
      tabla += '<thead style="background-color: #1d293e; color: white;">';
      tabla += '<tr>';
      tabla += '<th>Mes</th>';
      tabla += '<th>Pago Mensual</th>';
      tabla += '<th>Intereses</th>';
      tabla += '<th>Amortización</th>';
      tabla += '<th>Saldo</th>';
      tabla += '</tr>';
      tabla += '</thead>';
      tabla += '<tbody>';

      let saldo = montoSolicitado;

      for (var i = 1; i <= p; i++) {
        let vInteres = interes(tm, i, pagoMensual, montoSolicitado);
        let amortizacion = pagoMensual - vInteres;
        saldo = saldo - amortizacion;

        tabla += '<tr>';
        tabla += '<td>' + i + '</td>';
        tabla += '<td>' + pagoMensual.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</td>';
        tabla += '<td>' + vInteres.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</td>';
        tabla += '<td>' + amortizacion.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</td>';
        tabla += '<td>' + saldo.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</td>';
        tabla += '</tr>';
      }

      tabla += '</tbody>';
      tabla += '</table>';
      tabla += '</div>';

      document.getElementById('tablaProyeccion').innerHTML = tabla;
      document.getElementById('divProyeccion').classList.remove('d-none');
    }