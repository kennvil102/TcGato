const buttons = document.querySelectorAll(".cuadrado");
let turno = true;
let in_game = true;
const reiniciar = document.querySelector("#reiniciar");
let ganadasx = 0;
let ganadas0 = 0;
let empates = 0;

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

    // Elegir una celda vacía aleatoriamente
    const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
    const celdaAleatoria = celdasVacias[indiceAleatorio];

    // Jugar en la celda aleatoria
    buttons[celdaAleatoria].textContent = "O";

    // Actualizar el turno y verificar si hay un ganador
    turno = !turno;
    if (ganador() !== -1) {
        // Mostrar el mensaje de ganador o empate
        mostrarResultado();
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (turno && e.target.textContent === "" && in_game) {
            e.target.textContent = "X";
            turno = !turno;
            if (ganador() === 1) {
                document.querySelector("#winner").textContent = alert("El Ganador fue X");
                ganadasx++;
                update();
            } else if (ganador() === -1) {
                document.querySelector("#winner").textContent = alert("Empate");
                empates++;
                update();
            } else {
                jugarTurnoDeMaquina(); // La máquina juega su turno
            }
        }
    });
}

reiniciar.addEventListener("click", (e) => {
    in_game = true;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = "";
    }
    document.querySelector("#winner").textContent = "";
    contador = 0;
});

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

let contador = 0;

function ganador() {
    for (let i = 0; i < list.length; i++) {
        if (buttons[list[i][0]].textContent === "X" && buttons[list[i][1]].textContent === "X" &&
            buttons[list[i][2]].textContent === "X") {
            in_game = false;
            return 1;
        } else if (buttons[list[i][0]].textContent === "O" && buttons[list[i][1]].textContent === "O" &&
            buttons[list[i][2]].textContent === "O") {
            in_game = false;
            return 0;
        }
    }
    if (contador === 9) {
        in_game = false;
        return -1;
    }
}

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
