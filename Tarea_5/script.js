function ejemploIfElse() {
    const edad = 20;
    let mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
    document.getElementById('resultado-if').innerHTML = `Edad: ${edad} - ${mensaje}`;
}

function ejemploSwitch() {
    const dia = document.getElementById('dia').value;
    let mensaje;
    switch (parseInt(dia)) {
        case 1: mensaje = "Lunes"; break;
        case 2: mensaje = "Martes"; break;
        default: mensaje = "Otro día";
    }
    document.getElementById('resultado-switch').innerHTML = `Día: ${mensaje}`;
}

function ejemploTryCatch() {
    try {
        let resultado = 10 / 0;
        if (!isFinite(resultado)) throw new Error("División por cero");
    } catch (error) {
        document.getElementById('resultado-try').innerHTML = `Error: ${error.message}`;
    }
}

function ejemploError() {
    const error = new TypeError("Error de tipo personalizado");
    document.getElementById('resultado-error').innerHTML = `${error.name}: ${error.message}`;
}

function ejemploFor() {
    let resultado = "";
    for (let i = 1; i <= 3; i++) {
        resultado += `Iteración ${i}<br>`;
    }
    document.getElementById('resultado-for').innerHTML = resultado;
}

function ejemploWhile() {
    let i = 1, resultado = "";
    while (i <= 3) {
        resultado += `While ${i}<br>`;
        i++;
    }
    document.getElementById('resultado-while').innerHTML = resultado;
}

function ejemploDoWhile() {
    let i = 1, resultado = "";
    do {
        resultado += `Do-While ${i}<br>`;
        i++;
    } while (i <= 3);
    document.getElementById('resultado-dowhile').innerHTML = resultado;
}

function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

function ejemploFunciones() {
    const nombre = document.getElementById('nombre').value || "Usuario";
    const resultado = saludar(nombre);
    document.getElementById('resultado-funciones').innerHTML = resultado;
}

function ejemploOperadores() {
    const a = parseFloat(document.getElementById('num1').value);
    const b = parseFloat(document.getElementById('num2').value);
    document.getElementById('resultado-operadores').innerHTML =
        `${a} + ${b} = ${a + b}<br>${a} - ${b} = ${a - b}<br>${a} * ${b} = ${a * b}`;
}

function ejemploLogicos() {
    const cond1 = document.getElementById('cond1').checked;
    const cond2 = document.getElementById('cond2').checked;
    document.getElementById('resultado-logicos').innerHTML =
        `AND: ${cond1 && cond2}<br>OR: ${cond1 || cond2}<br>NOT: ${!cond1}`;
}

function ejemploNumber() {
    const num = 123.456;
    document.getElementById('resultado-number').innerHTML =
        `Number: ${num}<br>toFixed(2): ${num.toFixed(2)}<br>parseInt: ${parseInt(num)}`;
}

function ejemploMath() {
    document.getElementById('resultado-math').innerHTML =
        `Math.PI: ${Math.PI}<br>Math.sqrt(16): ${Math.sqrt(16)}<br>Math.random(): ${Math.random()}`;
}

function ejemploDate() {
    const fecha = new Date();
    document.getElementById('resultado-date').innerHTML =
        `Fecha: ${fecha}<br>Año: ${fecha.getFullYear()}<br>Mes: ${fecha.getMonth()}`;
}

function ejemploCadenas() {
    const nombre = "Juan", edad = 25;
    const mensaje = `Hola, soy ${nombre} y tengo ${edad} años`;
    document.getElementById('resultado-cadenas').innerHTML = mensaje;
}

function ejemploString() {
    const texto = "JavaScript";
    document.getElementById('resultado-string').innerHTML =
        `Texto: ${texto}<br>Longitud: ${texto.length}<br>Mayúsculas: ${texto.toUpperCase()}`;
}

function ejemploArreglos() {
    const frutas = ["manzana", "banana", "naranja"];
    frutas.push("uva");
    document.getElementById('resultado-arreglos').innerHTML =
        `Array: [${frutas.join(', ')}]<br>Longitud: ${frutas.length}`;
}

function ejemploArreglosTipados() {
    const numeros = new Int32Array([1, 2, 3, 4, 5]);
    document.getElementById('resultado-tipados').innerHTML =
        `Int32Array: [${Array.from(numeros).join(', ')}]`;
}

function ejemploDOM() {
    document.getElementById('elemento-id').style.backgroundColor = 'yellow';
    document.getElementsByClassName('elemento-clase')[0].style.color = 'red';
    document.getElementsByTagName('span')[0].style.fontWeight = 'bold';
    document.getElementById('resultado-dom').innerHTML = 'Elementos modificados por DOM';
}