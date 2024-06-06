let froggerCanvas = document.getElementById('frogger');
let froggerContext = froggerCanvas.getContext('2d');

const frog = {
    x: froggerCanvas.width / 2 - 10,
    y: froggerCanvas.height - 20,
    width: 20,
    height: 20,
    color: 'GREEN'
};

const cars = [
    { x: 0, y: 50, width: 50, height: 20, speed: 2, color: 'RED' },
    { x: 100, y: 100, width: 50, height: 20, speed: 3, color: 'BLUE' },
    { x: 200, y: 150, width: 50, height: 20, speed: 2.5, color: 'YELLOW' }
];

function drawRectFrogger(x, y, w, h, color) {
    froggerContext.fillStyle = color;
    froggerContext.fillRect(x, y, w, h);
}

function drawFrog() {
    drawRectFrogger(frog.x, frog.y, frog.width, frog.height, frog.color);
}

function drawCars() {
    cars.forEach(car => drawRectFrogger(car.x, car.y, car.width, car.height, car.color));
}

function renderFrogger() {
    froggerContext.clearRect(0, 0, froggerCanvas.width, froggerCanvas.height);
    drawFrog();
    drawCars();
}

function updateFrogger() {
    cars.forEach(car => {
        car.x += car.speed;
        if (car.x > froggerCanvas.width) {
            car.x = -car.width;
        }
        if (collisionFrogger(frog, car)) {
            resetFrog();
        }
    });
    if (frog.y <= 0) {
        resetFrog();
        alert('Parabéns, Você Ganhou!');
    }
}

function collisionFrogger(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function resetFrog() {
    frog.x = froggerCanvas.width / 2 - 10;
    frog.y = froggerCanvas.height - 20;
}

function moveFrog(event) {
    switch (event.key) {
        case 'ArrowUp':
            frog.y -= 20;
            break;
        case 'ArrowDown':
            frog.y += 20;
            break;
        case 'ArrowLeft':
            frog.x -= 20;
            break;
        case 'ArrowRight':
            frog.x += 20;
            break;
    }
}

document.addEventListener('keydown', moveFrog);

function gameFrogger() {
    updateFrogger();
    renderFrogger();
}

let froggerInterval;

function startFrogger() {
    document.getElementById("games").style.display = "none"; // Oculta o menu de jogos
    document.getElementById("gameCanvas").style.display = "block"; // Exibe o container do canvas
    document.getElementById("pong").style.display = "none"; // Garante que o canvas Pong esteja oculto
    document.getElementById("snake").style.display = "none"; // Garante que o canvas Snake esteja oculto
    document.getElementById("frogger").style.display = "block"; // Exibe o canvas Frogger

    clearInterval(froggerInterval);
    froggerInterval = setInterval(gameFrogger, 1000 / 50);
}