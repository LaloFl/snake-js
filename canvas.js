var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = canvas.clientWidth;
ctx.fillStyle = "#252525";
ctx.fillRect(0, 0, canvasSize, canvasSize);
let nTiles = 6;
while (canvasSize % nTiles !== 0) {
  nTiles++;
}
let tileSize = canvasSize / nTiles;
let gap = tileSize / 10;

let snake = [];
let usedTiles = [];
let direction = "down";
let applePos;
const drawTile = (x, y, color) => {
  usedTiles.push({ x, y });
  ctx.fillStyle = color;
  ctx.fillRect(
    x * tileSize + gap / 2,
    y * tileSize + gap / 2,
    tileSize - gap,
    tileSize - gap
  );
};

const tileIsUsed = (x, y) => {
  if (usedTiles.find((tile) => tile.x === x && tile.y === y)) {
    return true;
  }
  return false;
};

const generateApple = () => {
  let x = Math.floor(Math.random() * nTiles);
  let y = Math.floor(Math.random() * nTiles);
  if (tileIsUsed(x, y)) {
    return generateApple();
  }
  applePos = { x, y };
  drawTile(x, y, "#f00");
};

const eatApple = () => {};

const drawSnake = () => {
  snake.forEach((tile) => {
    drawTile(tile.x, tile.y, "#0f0");
  });
};

// setInterval(() => {
//   generateApple();
// }, 100);

canvas.addEventListener("keydown", (e) => {
  console.log(e.key);
});

const moveSnake = () => {
  let newPos = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      newPos.y--;
      if (newPos.y < 0) {
        newPos.y = nTiles - 1;
      }
      break;
    case "down":
      newPos.y++;
      if (newPos.y > nTiles - 1) {
        newPos.y = 0;
      }
      break;
    case "left":
      newPos.x--;
      if (newPos.x < 0) {
        newPos.x = nTiles - 1;
      }
      break;
    case "right":
      newPos.x++;
      if (newPos.x > nTiles - 1) {
        newPos.x = 0;
      }
      break;
  }
  if (tileIsUsed(newPos.x, newPos.y)) {
    alert("Game Over");
    return;
  }
  snake.unshift(newPos);
  if (newPos.x === applePos.x && newPos.y === applePos.y) {
    eatApple();
  }
  snake.pop();
  drawSnake();
};

const startGame = () => {
  snake = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ];
  generateApple();
  drawSnake();
};

startGame();
