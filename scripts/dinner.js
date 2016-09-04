
let dinner = ['Salad', 'Pizza', 'Tacos', 'Instant noodles', 'Pad Thai', 'Nachos', 'Dumplings', 'Pasta', 'Kibbles', 'carrots...']
let bePolite = [' ', 'Possibly', 'Thinking it might be', 'Feeling like', 'Craving', 'Left over', 'Most likely,']

module.exports = function (vivibot) {
  vivibot.hear(/Whats for dinner?/, function (food) {
    // return food.send(bePolite[Math.floor(Math.random() * (7 - 1) + 1)] + ' ' + dinner[Math.floor(Math.random() * (10 - 1) + 1)]);
    return food.send(`${food.random(bePolite)} ${food.random(dinner)}`)
  })
}
