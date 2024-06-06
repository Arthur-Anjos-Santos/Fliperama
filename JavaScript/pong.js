let pongCanvas = document.getElementById('pong');
let pongContext = pongCanvas.getContext('2d');

const user = {
    x: 0,
    y: pongCanvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

const com = {
    x: pongCanvas.width - 10,
    y: pongCanvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

const ball = {
    x: pongCanvas.width / 2,
    y: pongCanvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'WHITE'
};

const net = {
    x: pongCanvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: pongCanvas.height,
    color: 'WHITE'
};

function drawRectPong(x, y, w, h, color) {
    pongContext.fillStyle = color;
    pongContext.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    pongContext.fillStyle = color;
    pongContext.beginPath();
    pongContext.arc(x, y, r, 0, Math.PI * 2, false);
    pongContext.closePath();
    pongContext.fill();
}

function drawText(text, x, y, color) {
    pongContext.fillStyle = color;
    pongContext.font = '45px fantasy';
    pongContext.fillText(text, x, y);
}

function renderPong() {
    drawRectPong(0, 0, pongCanvas.width, pongCanvas.height, '#000');
    drawRectPong(net.x, net.y, net.width, pongCanvas.height, net.color);
    drawText(user.score, pongCanvas.width / 4, pongCanvas.height / 5, 'WHITE');
    drawText(com.score, 3 * pongCanvas.width / 4, pongCanvas.height / 5, 'WHITE');
    drawRectPong(user.x, user.y, user.width, user.height, user.color);
    drawRectPong(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

pongCanvas.addEventListener('mousemove', getMousePos);

function getMousePos(evt) {
    let rect = pongCanvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

function collisionPong(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function resetBall() {
    ball.x = pongCanvas.width / 2;
    ball.y = pongCanvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function updatePong() {
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > pongCanvas.width) {
        user.score++;
        resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > pongCanvas.height) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x + ball.radius < pongCanvas.width / 2) ? user : com;

    if (collisionPong(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);

        let angleRad = (Math.PI / 4) * collidePoint;

        let direction = (ball.x + ball.radius < pongCanvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
    }
}

function gamePong() {
    updatePong();
    renderPong();
}

let pongInterval;

function startPong() {
    user.score = 0;
    com.score = 0;
    ball.x = pongCanvas.width / 2;
    ball.y = pongCanvas.height / 2;
    ball.speed = 5;
    ball.velocityX = 5;
    ball.velocityY = 5;

    document.getElementById("games").style.display = "none"; // Oculta o menu de jogos
    document.getElementById("gameCanvas").style.display = "block"; // Exibe o container do canvas
    document.getElementById("pong").style.display = "block"; // Exibe o canvas Pong
    document.getElementById("snake").style.display = "none"; // Garante que o canvas Snake esteja oculto
    document.getElementById("frogger").style.display = "none"; // Garante que o canvas Frogger esteja oculto

    clearInterval(pongInterval);
    pongInterval = setInterval(gamePong, 1000 / 50);
}