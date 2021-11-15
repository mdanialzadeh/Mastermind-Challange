# Mastermind-Challange
Mastermind Game created for Linkden UI engineering Apprenticeship code challange

Demo: https://mdanialzadeh.github.io/Mastermind-Challange/

coded in vs code and debugged using google chrome. some of the methods used in the code may cause issues if ran using internet explorer. 


tip: The answer and guess are available to view on the console after each turn is submited

todo: 
add visual indication for current round on the log board.
change the round results hints to make it more visible and accessible. X
    - added rules access to game during play - 
change how the alert for less than 4 pegs in answer shows up 
make the gameover screen look better



Project layout:
1.  computer play 
- random number generator to retrive 4 digits from 0 - 7
- set random numbers to an array of numbers
- numbers to pegs 

2. player user interface - allow player to choose an 4 length array of numbers from 0 - 7
- player should be able to edit array / delete numbers = > abiliity to guess the cominations
- player submit 4 length array as round answer
- numbers = colored pegs

3. end of each round = submit button
- resolve round => 
- present hint: you have x numbers correct and x numbers in the right position. ex. player has 2 numbers correct and one in the right position. 
- increase round number 
- push computer response to round to log 

4. resolve game  - Win or loose

5. reset game


problems encountered:

1. computer play:
- random api generats string -> need to split string into array

2. player interface: 
- stream lining process and trying to less variables = adding values to each button inorder to use constructors to create the peg objects for the log. trying to decrease the amount of CSS,possible use of a framework that would help decrease the use of repetative CSS code. 

3. End of each round: Submit the results and match it to the computer Answer
- initial attempt using filter caused errors in regards to duplicates => resolved issue by creating new arrays for the answer and guess consisting of pegs that were not correct position and color. 
- still had issues with multiples = realized that if i cross matched the players answer filtered through the computers and the reverse i would get two different values. if the answer filtered through guess was larger than the guess filtered through answer the correctly matched colors but not position would be correct. otherwise the computer filtered through answer was correct and accounted for the duplicates in both the answer and the guess. (this took alot of trial and error using chrome debugger in the code)

4. resolve game with pop up based off of if the player has attained the correct guesses within 10 rounds

5. reset game = currently resetting the game works by relaoding the page. would want to fix that at some point and bypass the initial overlay screen. 

*. still some problems with mobile viewing interms of aspect ratio - will have to adjust accordingly
*. some of the redundency with css can be filtered through and cleaned up. 
