let youWin = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_frantic.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_floopy.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_withstyle.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_poppin.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_ecstatic.gif'
]

let youLoose = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_evil.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_haha.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_no.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_rules.gif',
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_sad.gif'
]

module.exports = function (vivibot) {
  // Randomise a lock combination
  let lockCombination = () => {
    return Math.floor(Math.random() * (99999 - 10000) + 10000).toString().split('')
  }
  let lock = null

  // set numbers of tries
  let upToChance = () => {
    return Math.floor(Math.random() * (20 - 7) + 7)
  }

  let tries = null

  vivibot.respond(/start game/, function (startGame) {
    return startGame.send(`Alright, here\'s the rule:
    To unlock my precious gif, you will have to guess five single digits correctly
    When I say "lock xxxxx"
    Your answer should start with the word "pick" followed by five numbers
    Example: "pick 12345"
    When you have guessed the right number at the right spot
    "x" will turn into "o",
    this means you have unlocked one of the digits...
    I\'m very generous, so if you have got one of the numbers right,
    but it\'s not in the right spot, you\'ll get a "-" as a tiny hint

    Example: "lock xoxo-"

    Oh yeah, I won\'t tell you if a digit appears more than once, in my lock combination though,
    Happy picking!

    You will know when you have guessed all five digits, as you would have unlocked my secret happy gifs...

    Now tell me how many tries would you like to have?
    Reply by typing tries then a number
    Like such "tries 5"`)
  })

  vivibot.hear(/tries (.*)/i, function (setTries) {
    let userPref = setTries.match[1]
    tries = parseFloat(userPref)
    if (isNaN(tries)) {
      tries = 6
      lock = lockCombination
      return setTries.send(`You sure think you are funny, huh?
        I\'ll just give you ${tries} tries
        Let\'s just start?

        lock xxxxx
        You\'ve got ${tries} tries left`)
    } else if (tries > 20 || tries <= 0) {
      tries = upToChance
      lock = lockCombination
      return setTries.send(`That is a tad greedy there, I\'ll just give you ${tries} tries
      Let\'s start?

      lock xxxxx
      You\'ve got ${tries} tries left`)
    } else {
      lock = lockCombination
      return setTries.send(`Sound\'s good
      Let\'s start?

      lock xxxxx
      You\'ve got ${tries} tries left`) // lets start the game
    }
  })

  // When a user has made a guess
  vivibot.hear(/pick (.*)/, function (guess) {
    let checkLocks = () => { // Full game hint function right here
      let userInput = guess.match[1]
      let pick = userInput.split('') // Split into arrays
      if (userInput.length < 5) { // Check if user guess enough digits
        tries--
        return guess.reply(`You sure this is serious lock picking?
          This lock combination consist of five digits without spaces...
          You\'ve got ${tries} tries left`)
      }
      if (userInput.length > 5) {  // Check if user guess too many digits
        tries--
        return guess.reply(`Are you trying to test me?
          This lock combination only consist of five digits without spaces...
          You\'ve got ${tries} tries left`)
      }
      if (isNaN(parseFloat(userInput))) { // Check if guess are digits at all
        tries--
        return guess.reply(`That\'s not even a number...
        You\'ve got ${tries} tries left`)
      } else { // Other wise, if guess is legit
        let checkInput = pick.map(function (checkNumber, item) { // create a new array, by mappick over guess
          if (checkNumber !== lock[item]) { // checkNumber of guess in each array against lockCombination array in same index
            for (let x = 0; x < lock.length; x++) { // if it's not the same, loop through to check every other index in lockCombination array
              if (checkNumber === lock[x]) { // if we finally find a match
                return (`-`) // User guess gets a hint -, which means RIGHT NUMBER, WRONG POSITION(index)
              }
            }
            return (`x`) // Otherwise this number doesn't exist in any of the lockCombination array of number - sorry dudes
          } else { // the only thing left is to check if the right guessed number is in the right spot - woohoo!
            return (`o`)
          }
        })

        let hintUser = checkInput.join('') // lets string them together
        if (hintUser === 'ooooo') { // We will check if the string have all been satisfied, and the user has finally guessed what the random number is. - YAY gifs!
          tries = null
          return guess.reply(`Yes!, the combination IS ${lock.join('')}
          This is unbelievable!
          Congratulations!
          I can\'t believe you\'ve just picked my lock!
          ${guess.random(youWin)}


          Want another game?
          (answer "start game", or set "tries #", or just start picking!)`)
        } else { // otherwise if their guess is still wrong
          tries-- // they have used one of their tries, we shall deduct yo libido, I mean tries
          return guess.send(`lock ${hintUser}
          You\'ve got ${tries} tries left`) // lets finally give the users a string of hint
        }
      }
    }

    let missedYourChance = () => {
      return guess.send(`Well since you\'ve not set your tries preferences,
      I\'ve given you ${tries} tries`)
    }

    if (tries == null) {
      tries = upToChance
      lock = lockCombination
      missedYourChance
      checkLocks
    } else
    if (tries >= 1) { // Check if user still has enough tries to play the game
      checkLocks
    } else { // if user has used all their tries, they've just lost the game, and in come the taunting gifs.
      tries = null
      return guess.send(`Awwww no!
        You Loose!
        Better luck next round, eh?
        ${guess.random(youLoose)}

        Oh and by the way, The previos lock combination was ${lock.join('')}

        Want another game?
        (answer "start game", or set "tries #", or just start picking!)`)
    }
  })
}

 // for testingpurposes only + '/n/nlock ' + lock
