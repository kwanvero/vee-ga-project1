module.exports = function (vivibot) {
  let pong = function () {
    return Math.floor(Math.random() * (99999 - 10000) + 10000)
  }

  vivibot.respond(/hey/, function (playGame) {
    // let pong = [Math.floor(Math.random() * (99999 - 10000) + 10000)]
    return playGame.send ("pong " + pong)
  });

}
