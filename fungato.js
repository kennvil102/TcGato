
// Llamamos a los elementos por clase
const buttons = document.querySelectorAll(".cuadrado");
// Hacemos las variables para el turno y por si el juego sigue activo
let turno = true;
let in_game = true;
const reiniciar = document.querySelector("#reiniciar");
// Hacemos las variables que mostraremos atraves de un span
let ganadasx = 0;
let ganadas0 = 0;
let empates = 0;
// Llamamos a los elementos por su id y le aplicamos textContent esta función sirve para actualizar
function update() {
    document.querySelector("#ganadasX").textContent = "Juegos ganados de X: " + ganadasx;
    document.querySelector("#ganadasY").textContent = "Juegos ganados de O: " + ganadas0;
    document.querySelector("#empates").textContent = "Juegos con Empates: " + empates;
}

function jugarTurnoDeMaquina() {
    // Obtener todas las celdas vacías
    const celdasVacias = [];
    buttons.forEach((celda, index) => {
        if (celda.textContent === "") {
            celdasVacias.push(index);
        }
    });

    // Elegir una celda vacia aleatoriamente
    const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
    const celdaAleatoria = celdasVacias[indiceAleatorio];

    // Juega en una celda aleatoria
    buttons[celdaAleatoria].textContent = "O";

    // Cambia el turno y ve si hay un ganador
    turno = !turno;
    if (ganador() !== -1) {
        //  fun muesta el resultado
        mostrarResultado();
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (turno && e.target.textContent === "" && in_game) {
            e.target.textContent = "X";
            turno = !turno;
            if (ganador() === 1) {
                document.querySelector("#winner").textContent = "El Ganador fue X";
                ganadasx++;
                update();
            } else if (ganador() === -1) {
                document.querySelector("#winner").textContent = "Empate";
                empates++;
                update();
            } else {
                jugarTurnoDeMaquina(); // La maquinita juega su turno
            }
        }
    });
});

reiniciar.addEventListener("click", (e) => {
    in_game = true;
    buttons.forEach((button) => {
        button.textContent = "";
    });
    document.querySelector("#winner").textContent = "";
    contador = 0;
});
 /* Hacemos un array con las lista de combinaciones ganadoras*/
const list = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/* Hacemos el contador movimientos */
let contador = 0;
/* Función ganadora, luego iteramos verifica las casilas que estan en X */
function ganador() {
    for (let i = 0; i < list.length; i++) {
        if (buttons[list[i][0]].textContent === "X" && buttons[list[i][1]].textContent === "X" &&
            buttons[list[i][2]].textContent === "X") {
            in_game = false;
            return 1;
        } else if (buttons[list[i][0]].textContent === "O" && buttons[list[i][1]].textContent === "O" &&
            buttons[list[i][2]].textContent === "O") {
            in_game = false; // Verifica ganador y el juego deja de estar activo
            return 0;
        }
    }
    if (contador === 9) { // Si se realizan los 9 movimientos quiere decir que hay empate
        in_game = false;
        return -1;
    }
}
 /* Función mostrar el resultado en los span del HTML gana X lo actualiza, lo mismo con O Si
 no queda empate  */
function mostrarResultado() {
    if (ganador() === 1) {
        document.querySelector("#winner").textContent = "El Ganador fue X";
        ganadasx++;
        update();
    } else if (ganador() === 0) {
        document.querySelector("#winner").textContent = "El Ganador fue O";
        ganadas0++;
        update();
    } else {
        document.querySelector("#winner").textContent = "Empate";
        empates++;
        update();
    }
}
