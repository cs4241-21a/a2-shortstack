// Add some Javascript code here, to run on the front end.

console.log('Welcome to assignment 2!')

const USER_COLOR = '#007991'
const FOOD_COLOR = '#7FB285'

const MAX_X = 8
const MAX_Y = 8

const CANVAS_X = 640
const CANVAS_Y = 640
const SCALE = 1 //window.devicePixelRatio

const OBJECT_SIZE = 80

function randomCoords() {
  return [Math.floor(Math.random() * MAX_X), Math.floor(Math.random() * MAX_Y)]
}

function drawSquare(ctx, coords, color) {
  const x = coords[0] * OBJECT_SIZE
  const y = coords[1] * OBJECT_SIZE

  ctx.beginPath()
  ctx.rect(x, y, OBJECT_SIZE, OBJECT_SIZE)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}

function coordsMatching(a, b) {
  return a.toString() === b.toString()
}

function render(ctx, user, food) {
  ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y)
  drawSquare(ctx, user, USER_COLOR)
  drawSquare(ctx, food, FOOD_COLOR)
}

const app = Vue.createApp({
  data() {
    return {
      game: {
        user: [],
        food: [],
      },
      score: 0,
      intervalID: 0,
      results: [
        { name: 'Liam', score: 13 },
      ]
    }
  },
  mounted: function() {
    this.game.user = randomCoords()
    this.game.food = randomCoords()

    while (coordsMatching(this.game.user, this.game.food)) {
      this.game.food = randomCoords()
    }

    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    ctx.scale(SCALE, SCALE)

    document.onkeyup = (ev) => {
      switch (ev.key) {
        case 'ArrowLeft':
          this.moveLeft()
          break
        case 'ArrowRight':
         this.moveRight()
          break
        case 'ArrowUp':
          this.moveUp()
          break
        case 'ArrowDown':
          this.moveDown()
          break
      }
    }

    this.intervalID = setInterval(() => {
      while (coordsMatching(this.game.user, this.game.food)) {
        this.score++
        this.game.food = randomCoords()
      }
      render(ctx, this.game.user, this.game.food)
    }, 50)
  },
  methods: {
    moveLeft() {
      if (this.game.user[0] > 0) {
        this.game.user[0]--
      }
    },
    moveRight() {
      if (this.game.user[0] < MAX_X - 1) {
        this.game.user[0]++
      }
    },
    moveUp() {
      if (this.game.user[1] > 0) {
        this.game.user[1]--
      }
    },
    moveDown() {
      if (this.game.user[1] < MAX_Y - 1) {
        this.game.user[1]++
      }
    }
  },
  beforeUnmount: function() {
    clearInterval(this.intervalID)
  }
})

const vm = app.mount('#app')