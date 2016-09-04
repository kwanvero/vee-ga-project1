# Description:
  Vivibot, LOVES food and games, the purrrrfect cat bot.
    As well all know, dogs have masters, cats have staff, and Vivi sure does love to be the game master.

She was part of this assignment...
https://gist.github.com/Nicktho/2591663526ad01027083b9e308c407de

# Commands:

  # Ask
  Whats for dinner? - she's got a few favorites, so ask often!
  Where are you now? - She's a cat, so she sure does roam.... She probably can portal from one state to the other in seconds as well...

  #PickLock Game
  start game - to read the rules and start playing Vivi's favourite game.
     @vivibot - if you aren't in a private session

  tries # - replace # with any number you fancy, to set your prefs for the game.

  pick ##### - replace # with your 5 guessed digits to start guessing


# PickLock game rules - as explained by Vivi herself.
  My precious lock consist of five consecutive single numbers,
  You're job is to pick the lock and guess all five digits correctly
  When I say "lock xxxxx"
  You're answer should start with the word "pick" followed by five numbers
  Example: "pick 12345"
  When the right number is at the right position
  "x" will turn to "o", that means you have unlocked one of the digits...
  I'm very generous, so if you have got one of the numbers right, but it's not in the right spot, you'll get a "-" as a tiny hint
  Example: "lock xoxo-"

  Oh yeah, I won't tell you if a digit appears more than once in my lock combination though,
  happy picking!

  You will know when you have guessed all five digits, as you would have unlocked my secret happy gifs...

# Set PickLock game tries - as explained by Vivi herself.
  Now tell me how many tries would you like to have?
  Reply by typing a number then tries
  Like such "tries 5"

# Approach Taken
  Umm, lots and lots of if elses

# Unsolved problems
  I can't figure out how to
    1. Make the code smaller and not break, tried and it's just would'nt work.
    2. When the same digits appear twice,
        a. This solution is to run a loop randomizer through an array and check if previous arrays already had the number... that would be a too easy game...
        b. This solution consist of checking whehter the digit appears twice, to show a differnt hint like (c) and only goes o when the digit has been entered correctly over the whole array.
        c. or lets just keep it as part of Vivi being a difficult catbot....
    3. What does this even mean? - can you show me how to do this?
      " One of the commands must utilize the list of people in the class to send a direct message or reply."

# Installation instructions...
  umm huh? I don't know... add her to your channel I guess??

# Author:
  Vee Mercado! - veronicammer@gmail.com
