var prompt = require('sync-prompt').prompt

var start = prompt('Welcome to the game \n Press (1) to start\n Press (2) to quit \n\t')
start === '1' ? startGame() : null

function Hero (name) {
  this.name = name || 'hero'
  this.health = 100
  this.position = [0, 0]
  this.damage = 5
  this.items = {}
  this.getItems = getItems
  this.move = move
  this.combat = combat
}

function getItems () {
  if (Object.keys(this.items).length === 0) {
    console.log('You don\'t have any items!')
  }
  else {
    for (var item in this.items) {
      console.log(item)
    }
  }
}

function move (level) {
  level.level[this.position[0]][this.position[1]] = ' '
  var direction = prompt('Which direction do you want to move?\n')
  switch (direction) {
    case 'left':
      this.position[1]--
      break
    case 'right':
      this.position[1]++
      break
    case 'up':
      this.position[0]--
      break
    case 'down':
      this.position[0]++
      break
  }
  switch (level.checkSpace(this.position)) {
    case 'm':
      this.combat(level)
      break
    case 'invalid':
      this.move(level)
      break
    default:
      break
  }
}

function combat (level) {
  var monsterHealth = 10
  var monsterDamage = 2
  console.log('You spot a monster!\n')
  while (monsterHealth > 0) {
    var data = 'Your health: ' + this.health + '\t Monster health: ' + monsterHealth
    console.log(data)
    var option = prompt('What would you like to do?\n Press (1) to attack\n Press (2) to run away\n')
    switch (option) {
      case '1':
        monsterHealth -= this.damage
        console.log('You hit monster for ' + this.damage + ' damage')
        this.health -= monsterDamage
        console.log('Monster hit you for ' + monsterDamage + ' damage')
        break
      case '2':
        this.move(level)
        return
    }
  }
}

function Gameboard (opts) {
  this.size = 10
  this.getMonsters = getMonsters
  this.setMonsters = setMonsters
  this.setLevel = setLevel
  this.checkSpace = checkSpace
  this.draw = draw
  this.monsters = this.getMonsters()
  this.level = this.setLevel()
  this.setMonsters()
}

function checkSpace (pos) {
  return this.level[pos[0]][pos[1]] || 'invalid'
}

function setMonsters () {
  var that = this
  this.monsters.forEach(function (monster) {
    that.level[monster[0]][monster[1]] = 'm'
  })
}

function setLevel () {
  var level = []
  for (var i = 0; i < this.size; i++) {
    var row = []
    for (var j = 0; j < this.size; j++) {
      row.push(' ')
    }
    level.push(row)
  }
  return level
}

function draw (hero) {
  this.level[hero.position[0]][hero.position[1]] = 'h'
  console.log(this.level)
}

function getMonsters () {
  var monsters = []
  for (var i = 0; i < 5; i++) {
    var randX = Math.floor(Math.random() * (this.size - 1))
    var randY = Math.floor(Math.random() * (this.size - 1))
    monsters.push([randX, randY])
  }
  return monsters
}

function startGame () {
  var level = new Gameboard()
  var myHero = new Hero()
  while (myHero.health > 0) {
    level.draw(myHero)
    nextAction(myHero, level)
  }
}

function nextAction (myHero, level) {
  var move = prompt('What would you like to do?\n' +
    ' Press (1) to check inventory\n' +
    ' Press (2) to move\n' +
    ' Press (3) to quit\n')
  switch (move) {
    case '1':
      myHero.getItems()
      break
    case '2':
      myHero.move(level)
      break
    case '3':
      process.exit()
      break
    default:
      console.log('Invalid response!')
      nextAction(myHero)
      break
  }
}
