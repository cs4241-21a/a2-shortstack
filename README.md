Aidan Pecorale
https://a2-alpecorale.glitch.me/
## Flappy Block
My application is a small game where users can compete to enter their name and score on the leaderboard. To play the game press start game and use the "Flap" button or your 'Space bar' to increase the Y position of the block. Navagate through the green elements to raise your score and submit your name and score to the leaderboard.

To submit an entry to the leaderboard the user must start a game using the start game button and play until they crash into a block, where they will then be greeted with the options to play again or input their name into the form at the bottom and submit their score. The server will then calculate the users rank by comparing their score with other users in the table and finally insert and update the table which will be displayed to the user. 

A few less noticable features include the ability to edit and report (delete) user information from the leaderboard. Players can edit their username by pressing the pencil icon to the right of their name and a input feild will appear which can be used to change their name. One note here is the the user will not be able to choose a name that is already in use on the leaderboard. Additionaly this check is set in place for submitting more scores so if a user trys to resubmit a new score a new entry will not be added unless the new score is higher than their previous score. 
Lastly by pressing the trash can icon you can report or delete the information of another user if you suspect their score to be a result of cheating. Some pop up warnings are available to help guide you in these situations.

The page utilizes two main methods of formating by first spliting the page into two section one of 70% and the other of 30% then utilizing column flex boxes in each of those sections for further alignment of page elements. 
Other CSS features include Various fonts from Google Font API, Coloration on the Leaderboard table, button hover and click effects.

While much of the leaderboard, form functionality was done with javascript the game was also created with JavaScript as well. 


## Technical Achievements
- **Current Server State**: Using fetch 'GET' commands and updating the HTML page upon each addition, removal or modification the leaderboard will update with each new server update. One nifty highlight is the reorganization of the rows depending on the calculated rank variable.
- **Modify & Delete**: Using the images on the right side of the table users have the ability to edit their username and delete entries from the table. 
- **Checks for Inputs**: When a user submits their score the server checks if their name already has a score associated with it and updates their score value with the new score if it is higher than their original score but does not add anything if it is lower. The Edit function checks to see if another user has a name already before modifying your name and produces a warning if done. 

### Design/Evaluation Achievements
- **User Testing**:  I performed user studies with my roomates Jackie Novak and Adele Burton. I gave each participant the task of playing the game, submitting their score to the leaderboard, editing their name then deleting their score. Some of the comments I recieved about usibility were frustration about controlling the game elements and some confusion on how to edit names due to the indicators not being super visable and intuitive. On their first attempts to control the block in the game they lost precious seconds trying to use the up button or space bar even clicking on the game area rather than the "Flap" button because the button lied too low on the screen that it was not clearly visable. I remidied these comments by moving some of the elements futher up so the "Flap" button could be seen easier, additionally I added some key listeners for the space bar so users can control it with keyboard input as well. The other main source of confusion was how to edit their names on one instance I had to point out to the participant that clicking on the pencil icon would open up a new form for them to edit their names as they had initially tried to change the name in the score submission section and inputed a new result on the leaderboard. While most reviews of the platform were positive they did have a little to say about the color scheme and design choices which a few were taken into consideration. 
