var prompt = require('sync-prompt').prompt
var health = 100
var size = 20
var position = 0
var coins = 0
var name = prompt('What is your name? ')

function main() {
  while (health > 0 && position < size) {
    prompt('Push any key to roll the dice! \n')

    steps = rollDice()
    console.log('You rolled a ' + steps)
    position = move(position, steps)
    damage = getMonster()
    console.log(enterCombat(damage))
    health = combat(health, damage)
    coins = newCoins(coins)
    console.log(status(position, health, coins))
  }
  win()
}


function rollDice () {
  return Math.floor(Math.random() * 6) + 1
}

function move (p, s) {
  return p + s
}

function enterCombat (d) {
  return ' You encounter a monster! \n The monster hits you for ' + d + ' damage.\n You have defeated the monster.\n'
}

function getMonster () {
  return Math.floor(Math.random() * 10) + 1
}

function combat (h, d) {
  return h - d
}

function newCoins (c) {
  return c + Math.floor(Math.random() * 5) + 1
}

function status (p, h, c) {
  return 'Position: ' + p + '\nHealth: ' + h + '\nCoins: ' + c
}

function win () {
  console.log('Congratulations, ' + name)
}

main()
