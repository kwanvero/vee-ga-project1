module.exports = function (robot) {

  robot.respond(/What's for dinner?/, function (res) {

    let dinner = ['Salad', 'Pizza', 'Tacos', 'Instant noodles', 'Pad Thai', 'Nachos', 'Dumplings', 'Pasta', 'Kibbles', 'a carrot...']
    let bePolite = ['', 'Possibly', 'Thinking it might be', 'Feeling like', 'Craving', 'Left over', 'Most likely,']

    return res.send(bePolite[Math.floor(Math.random() * (10 - 1) + 1)] + ' ' + dinner[Math.floor(Math.random() * (7 - 1) + 1)]);

  });
}
