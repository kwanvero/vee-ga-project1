youWin = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_frantic.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_floopy.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_withstyle.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_poppin.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/c_ecstatic.gif'
]
youLoose = [
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_evil.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_haha.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_no.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_rules.gif'
  'http://176.32.230.9/veemercado.com//GA/Assignment/01/l_sad.gif'
]

module.exports = (vivibot) ->
  lock = undefined
  tries = null
  # Randomise a number

  lockCombination = ->
    Math.floor(Math.random() * (99999 - 10000) + 10000).toString().split ''

  # set numbers of tries

  upToChance = ->
    Math.floor Math.random() * (20 - 7) + 7

  vivibot.hear /start game/, (startGame) ->
    startGame.send 'Alright, here\'s the rule:\nMy precious lock consist of five single numbers,\nYour job is to pick the lock and guess all five digits correctly\nWhen I say "lock xxxxx"\nYour answer should start with the word "pick" followed by five numbers\nExample: "pick 12345"\nWhen the right number is at the right position\n"x" will turn to "o",\nthis means you have unlocked one of the digits...\nI\'m very generous, so if you have got one of the numbers right,\nbut it\'s not in the right spot, you\'ll get a "-" as a tiny hint\n\nExample: "lock xoxo-"\n\n\nOh yeah, I won\'t tell you if a digit appears more than once, in my lock combination though,\n\nhappy picking!\n\n\nYou will know when you have guessed all five digits, as you would have unlocked my secret happy gifs...\n\n\n\nNow tell me how many tries would you like to have?\nReply by typing tries then a number\nLike such "tries 5"'
  vivibot.hear /tries (.*)/i, (setTries) ->
    userPref = setTries.match[1]
    tries = parseFloat(userPref)
    if tries > 20 or tries <= 0
      tries = upToChance()
      lock = lockCombination()
      setTries.send 'That is a tad greedy there, I\'ll just give you ' + tries + ' tries\n Let\'s start?\nlock xxxxx' + '\nYou\'ve got ' + tries + ' tries left'
    else
      lock = lockCombination()
      setTries.send 'Sound\'s good\n Let\'s start?\nlock xxxxx' + '\nYou\'ve got ' + tries + ' tries left'
      # lets start the game
  # When a user has made a guess
  vivibot.hear /pick (.*)/, (guess) ->

    checkLocks = ->
      userInput = guess.match[1]
      pick = userInput.split('')
      # Split into arrays
      if userInput.length < 5
        # Check if user guess enough digits
        guess.reply 'You sure this is serious lock picking?\nThis lock combination consist of five digits without spaces...'
      else if userInput.length > 5
        # Check if user guess too many digits
        guess.reply 'Are you trying to test me?\nThis lock combination only consist of five digits without spaces...'
      else if isNaN(parseFloat(userInput))
        # Check if guess are digits at all
        guess.reply 'That\'s not even a number...'
      else
        # Other wise, if guess is legit
        checkInput = pick.map((checkNumber, item) ->
          # create a new array, by mappick over guess
          if checkNumber != lock[item]
            # checkNumber of guess in each array against lockCombination array in same index
            x = 0
            while x < lock.length
              # if it's not the same, loop through to check every other index in lockCombination array
              if checkNumber == lock[x]
                # if we finally find a match
                return '-'
                # User guess gets a hint -, which means RIGHT NUMBER, WRONG POSITION(index)
              x++
            'x'
            # Otherwise this number doesn't exist in any of the lockCombination array of number - sorry dudes
          else
            # the only thing left is to check if the right guessed number is in the right spot - woohoo!
            'o'
        )
        hintUser = checkInput.join('')
        # lets string them together
        if hintUser == 'ooooo'
          # We will check if the string have all been satisfied, and the user has finally guessed what the random number is. - YAY gifs!
          tries = null
          guess.reply 'Yes!, the combination IS ' + lock.join('') + '\nThis is unbelievable!\nCongratulations!\nI can\'t believe you\'ve just picked my lock!\n' + guess.random(youWin) + '\n\n\n Want another game? (answer "start game" or set "tries #" or just start picking!)'
        else
          # otherwise if their guess is still wrong
          tries--
          # they have used one of their tries, we shall add on the tries
          guess.send 'lock ' + hintUser + '\nYou\'ve got ' + tries + ' tries left'
          # lets finally give the users a string of hint

    missedYourChance = ->
      guess.send 'Well since you\'ve not set your tries preferences, \nI\'ve given you ' + tries + ' tries'

    if tries == null
      tries = upToChance()
      lock = lockCombination()
      missedYourChance()
      checkLocks()
    else if tries >= 1
      # Check if user still has enough tries to play the game
      checkLocks()
    else
      # if user has used all their tries, they've just lost the game, and in come the taunting gifs.
      tries = null
      return guess.send('Awwww no!\nYou Loose!\nBetter luck next round, eh?' + guess.random(youLoose) + '\nOh and by the way, The previos lock combination was ' + lock.join('') + '\n\n\n Want another game?\n(answer "start game", or set "tries #",\nor just start picking!)')
    return
  return

# ---
# generated by js2coffee 2.2.0
