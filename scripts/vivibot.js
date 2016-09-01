module.exports = function (vivibot) {

  vivibot.hear(/Whats for dinner?/, function (food) {
    let dinner = ['Salad', 'Pizza', 'Tacos', 'Instant noodles', 'Pad Thai', 'Nachos', 'Dumplings', 'Pasta', 'Kibbles', 'a carrot...']
    let bePolite = [' ', 'Possibly', 'Thinking it might be', 'Feeling like', 'Craving', 'Left over', 'Most likely,']

    //return food.send(bePolite[Math.floor(Math.random() * (7 - 1) + 1)] + ' ' + dinner[Math.floor(Math.random() * (10 - 1) + 1)]);
    return food.send(food.random(bePolite), ' ', food.random(dinner));
  })


  vivibot.respond(/(.*) play a game(.*)/, function (game) {
    return game.send ('I get to be game master!, You sure about this? (answer "game yep" or "game nah")');

    vivibot.hear(/game (.*)/i, function(gameDecision) {
      var answer
      answer = gameDecision.match[1]
      if (answer == 'yep') {
        return gameDecision.send('Alright, here\'s the rule:');
        return gameDecision.send('You\'ve got to guess five consecutive single numbers correctly');
        return gameDecision.send('When I say "pong xxxxx" ');
        return gameDecision.send('You\'re answer should start with the word "ping" followed by five numbers ');
        return gameDecision.send('Example: "ping 12345"');
        return gameDecision.send('When the right number is at the right position "x" will turn to "o"');
        return gameDecision.send('Example: "pong xoxox"');
      } else if (answer == 'nah'){
        return gameDecision.reply('You afraid?, You a chicken?');
      } else{
        return gameDecision.reply('So... game?');
      }

    })

  })

}
