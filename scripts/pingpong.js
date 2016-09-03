let youWin = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_frantic.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_floopy.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_withstyle.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_poppin.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_ecstatic.gif'
]

let youLost = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_evil.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_haha.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_no.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_rules.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_sad.gif'
]

module.exports = function (vivibot) {
  let randomNumber = function () {
    return Math.floor(Math.random() * (99999 - 10000) + 10000).toString().split('')
  }

  let pong = randomNumber()

  // let tries = 0

  // let randomNum = '12345'
  // let pong = randomNum.split('')

  vivibot.respond(/[Gg]ame [Ss]tart/, function (playGame) {
    return playGame.send(pong)
  })

  vivibot.hear(/ping (.*)/, function (guess) {
    let userInput = guess.match[1]
    let ping = userInput.split('')

    if (parseFloat(userInput) <= 9999) {
      return guess.send('You sure this is a serious guess?\nI\'m asking for five digits without spaces...')
    } else if (parseFloat(userInput) > 99999) {
      return guess.send('Probably one too many digits there...\nI\'m only asking for five digits without spaces...')
    } else if (isNaN(parseFloat(userInput))) {
      return guess.send('Are you trying to test me?')
    } else {
      let checkInput = ping.map(function (checkNumber, item) {
        if (checkNumber !== pong[item]) {
          for (let x = 0; x < pong.length; x++) {
            if (checkNumber === pong[x]) {
              return '-'
            }
          }
          return ('x')
        } else {
          return ('o')
        }
      })

      let hintUser = checkInput.join('')
      if (hintUser === 'ooooo') {
        return guess.send('Yes!, the answer IS ' + pong.join('') + '\nThis is unbelievable!\nCongratulations!\nI can\'t believe you\'ve guessed it!\n' + guess.random(youWin))
      } else {
        return guess.send('pong ' + hintUser + '\n pong ' + pong)
      }
    }
  })

  vivibot.hear(/loose/, function (loose) {
    return loose.send('Awwww no!\nYou Loose!\nBetter luck next round, eh?' + loose.random(youLost) + '\nOh and by the way, The answer was ' + pong.join(''))
  })
}
