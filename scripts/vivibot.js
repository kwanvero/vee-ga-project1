module.exports = function (robot) {

  robot.hear(/What's for dinner?/, function (food) {

    let dinner = ['Salad', 'Pizza', 'Tacos', 'Instant noodles', 'Pad Thai', 'Nachos', 'Dumplings', 'Pasta', 'Kibbles', 'a carrot...']
    let bePolite = [' ', 'Possibly', 'Thinking it might be', 'Feeling like', 'Craving', 'Left over', 'Most likely,']

    return food.send(bePolite[Math.floor(Math.random() * (7 - 1) + 1)] + ' ' + dinner[Math.floor(Math.random() * (10 - 1) + 1)])

  })

  robot.respond(/(.*) play (.*) game (.*)/, function (game) {

    return game.send("I get to be game master!, You sure about this?")
  })
}
