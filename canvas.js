var canvas = document.getElementById("canvas");
canvas.focus();
const ctx = canvas.getContext("2d");
const canvasSize = canvas.clientWidth;
ctx.fillStyle = "#252525";
ctx.fillRect(0, 0, canvasSize, canvasSize);
let nTiles = 8;
while (canvasSize % nTiles !== 0) {
  nTiles++;
}
let tileSize = canvasSize / nTiles;
let gap = tileSize / 10;
let maxGap = gap * 7;

let skippedMovement = false;
let snake = [];
let usedTiles = [];
let direction = "down";
let applePos;

const drawTile = (x, y, color, isApple = false, customGap = gap) => {
  if (customGap > maxGap) customGap = maxGap;
  ctx.fillStyle = color;
  ctx.fillRect(
    x * tileSize + customGap / 2,
    y * tileSize + customGap / 2,
    tileSize - customGap,
    tileSize - customGap
  );
};

const tileIsUsed = (x, y) => {
  if (usedTiles.find((tile) => tile.x === x && tile.y === y)) {
    return true;
  }
  return false;
};

const generateApple = () => {
  let x = Math.floor(Math.random() * (nTiles - 1));
  let y = Math.floor(Math.random() * (nTiles - 1));
  if (tileIsUsed(x, y)) {
    return generateApple();
  }

  applePos = { x, y };
  drawTile(x, y, "#f00", true);
};

const eatApple = () => {
  generateApple();
  snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
};

const drawSnake = () => {
  ctx.fillStyle = "#252525";
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  drawTile(applePos.x, applePos.y, "#f00", true);
  snake.forEach((tile, i) => {
    drawTile(tile.x, tile.y, "#0f0", false, gap + i * 4);
  });
};

let wait = false;
canvas.addEventListener("keydown", (e) => {
  if (
    (e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight") ||
    wait
  )
    return;

  wait = true;
  let directionKey = e.key.substring(5, e.key.length).toLowerCase();
  if (
    (direction === "right" && directionKey === "left") ||
    (direction === "left" && directionKey === "right") ||
    (direction === "up" && directionKey === "down") ||
    (direction === "down" && directionKey === "up")
  )
    return;

  direction = directionKey;
  skippedMovement = true;
  wait = false;
  moveSnake();
});

const moveSnake = () => {
  if (skippedMovement === true) {
    skippedMovement = false;
    return;
  }
  let newPos = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      newPos.y--;
      if (newPos.y < 0) {
        gameOver();
      }
      break;
    case "down":
      newPos.y++;
      if (newPos.y > nTiles - 1) {
        gameOver();
      }
      break;
    case "left":
      newPos.x--;
      if (newPos.x < 0) {
        gameOver();
      }
      break;
    case "right":
      newPos.x++;
      if (newPos.x > nTiles - 1) {
        gameOver();
      }
      break;
  }

  if (tileIsUsed(newPos.x, newPos.y)) {
    gameOver();
    return;
  }
  snake.unshift(newPos);

  if (newPos.x === applePos.x && newPos.y === applePos.y) {
    eatApple();
  }
  snake.pop();
  usedTiles = snake;
  drawSnake();
};

const startGame = () => {
  snake = [
    { x: 1, y: 3 },
    { x: 1, y: 2 },
    { x: 1, y: 1 },
  ];
  usedTiles = snake;

  generateApple();
  drawSnake();
};

const gameOver = () => {
  alert("Game Over");
};

startGame();
setInterval(() => {
  moveSnake();
}, 160);
