// Definição das variáveis globais
let canvas;
let ctx;
let snake;
let food;
let tileSize = 20;
let score = 0;
let interval;

// Adiciona um event listener para detectar as setas do teclado
document.addEventListener("keydown", handleKeyPress);

// Função para iniciar o jogo Snake
function startSnake() {
    canvas = document.createElement("canvas"); // Cria o canvas do jogo
    ctx = canvas.getContext("2d");
    canvas.width = 600; // Aumenta a largura do canvas
    canvas.height = 400;
    document.body.appendChild(canvas);

    snake = new Snake();
    food = new Food();

    interval = setInterval(gameLoop, 100); //Alterar a velocidade da cobra

    // Oculta o menu de opções
    document.getElementById("games").style.display = "none";

    // Cria e centraliza o canvas do jogo
    CenterCanvas();

    // Inicia o jogo
    startSnakeGame();
}

// Função centralizar o canvas do jogo
function CenterCanvas() {

    // Centraliza o canvas na tela
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";

    // Adiciona o canvas à página
    document.body.appendChild(canvas);
}

// Função para lidar com as teclas pressionadas
function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (snake.direction !== "down")
                snake.direction = "up";
            break;
        case "ArrowDown":
            if (snake.direction !== "up")
                snake.direction = "down";
            break;
        case "ArrowLeft":
            if (snake.direction !== "right")
                snake.direction = "left";
            break;
        case "ArrowRight":
            if (snake.direction !== "left")
                snake.direction = "right";
            break;
    }
}

// Definição da classe Snake
class Snake {
    constructor() {
        this.body = [{x: 10, y: 10}];
        this.direction = "right";
    }

    draw() {
        ctx.fillStyle = "#FFFFFF";
        this.body.forEach(segment => {
            ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });
    }

    move() {
        const head = {x: this.body[0].x, y: this.body[0].y};
        switch (this.direction) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
        }

        this.body.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food.spawn();
        } else {
            this.body.pop();
        }
    }

    checkCollision() {
        const head = this.body[0];

        if (head.x < 0 || head.x >= canvas.width / tileSize ||
            head.y < 0 || head.y >= canvas.height / tileSize) {
            gameOver();
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                gameOver();
            }
        }
    }
}

// Definição da classe Food
class Food {
    constructor() {
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * (canvas.width / tileSize));
        this.y = Math.floor(Math.random() * (canvas.height / tileSize));
    }

    draw() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }
}

// Função de loop do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha marcação nas bordas
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    snake.move();
    snake.draw();
    food.draw();
    snake.checkCollision();

    // Desenha pontuação na tela
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: " + score, 10, 20);
}

// Função para encerrar o jogo e redirecionar para a página inicial
function gameOver() {
    clearInterval(interval);
    alert("Game Over! Pontuação: " + score);
    // Remova o canvas
    document.body.removeChild(canvas);
    // Volte para a página inicial
    window.location.href = "jogos.html";
}
