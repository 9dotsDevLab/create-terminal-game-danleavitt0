

function main() {
  var prompt = require('sync-prompt').prompt
  var health = 100
  var position = 0
  var coins = 0
  var name = prompt('What is your name? ')

  while (health > 0 && coins > 0) {
    prompt('Push any key to roll the dice! \n')

    var steps = rollDice()
    console.log('You rolled a ' + steps)
    position = move(position, steps)
    var damage = getMonster()
    console.log(enterCombat(damage))
    health = combat(health, damage)
    coins = newCoins(coins)
    console.log(status(position, health, coins))
  }
  end(name, position, health, coins)
}


function move (p, s) {
  return p + s
}

function combat (h, d) {
  return h - d
}

function rollDice () {
  return Math.floor(Math.random() * 6) + 1
}

function getMonster () {
  return Math.floor(Math.random() * 10) + 1
}

function newCoins (c) {
  return c + Math.floor(Math.random() * 5) + 1
}

function enterCombat (d) {
  return ' You encounter a monster! \n The monster hits you for ' + d + ' damage.\n The battle is over.\n'
}

function status (p, h, c) {
  return 'Position: ' + p + '\nHealth: ' + h + '\nCoins: ' + c
}

function end (name, p, c, h) {
  console.log(name + '\n\n You made it ' + p + ' steps. \n You had ' + c + ' coins. \n You had ' + h + ' health.')
}

main()
