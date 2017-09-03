const GAME_WIDTH = 640
const GAME_HEIGHT = 480
const PLAYER_SIZE = 30
const PLAYER_SPEED = 2
const FRAME_SPEED = 1000 / 60

let startTime
let lastTime
let player = {
  x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2),
  y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2),
}
let keyboard = {
  left: false,
  right: false,
  up: false,
  down: false,
}

function onReady() {
  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')

  document.addEventListener('keydown', ({ code }) => onKeychange(code, true))
  document.addEventListener('keyup', ({ code }) => onKeychange(code, false))

  requestAnimationFrame((now) => loop(ctx, now))
}

function onKeychange(keyCode, isDown) {
  switch (keyCode) {
    case 'ArrowLeft':
      return keyboard.left = isDown
    case 'ArrowRight':
      return keyboard.right = isDown
    case 'ArrowUp':
      return keyboard.up = isDown
    case 'ArrowDown':
      return keyboard.down = isDown
  }
}

function loop(ctx, now) {
  update(now)
  draw(ctx)

  requestAnimationFrame((now) => loop(ctx, now))
}

function update(now) {
  if (!startTime) {
    startTime = lastTime = now
    return
  }

  const deltaTime = now - lastTime
  const moveAmount = PLAYER_SPEED * (deltaTime / FRAME_SPEED)
  if (keyboard.left) {
    player.x -= moveAmount
    if (player.x < 0) player.x = 0
  }
  if (keyboard.right) {
    player.x += moveAmount
    if (player.x > GAME_WIDTH - PLAYER_SIZE) player.x = GAME_WIDTH - PLAYER_SIZE
  }
  if (keyboard.up) {
    player.y -= moveAmount
    if (player.y < 0) player.y = 0
  }
  if (keyboard.down) {
    player.y += moveAmount
    if (player.y > GAME_HEIGHT - PLAYER_SIZE) player.y = GAME_HEIGHT - PLAYER_SIZE
  }

  lastTime = now
}

function draw(ctx) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  drawPlayer(ctx, player.x, player.y)
}

function drawPlayer(ctx, x, y) {
  ctx.fillStyle = '#00aaff'
  ctx.fillRect(x, y, PLAYER_SIZE, PLAYER_SIZE)
  ctx.strokeStyle = '#ccc'
  ctx.strokeRect(x, y, PLAYER_SIZE, PLAYER_SIZE)
}

document.addEventListener('DOMContentLoaded', onReady)
