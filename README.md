To test this application go to a2-lorendiloreto.glitch.me

## Blackjack
This application is a blackjack game which includes other features such as signing in, keeping track of stats and editing stats. To play the game, you can simply pick how much money to wager and click the play button. If you would like to create an account to play with, you can use the add/edit data form at the bottom to add a new user to the data. Another option is to sign in with one of the exisiting users. To edit any of the data, you can use the same form as adding a user at the bottom of the page, except just make sure to put an exisiting username into the "username" field. If you are unfamiliar with the rules of blackjack, this link is very informative https://bicyclecards.com/how-to-play/blackjack/. The one exception to the rules is that an Ace card only counts as a 1 instead of counting as a 1 or 11. I used css flexboxes to position the html elements. My derived field is the net profit field. When a new user is created, net profit is calculated using balance - initial balance. The "leaderboard" is the results table that shows all of the data in the server. I used element selectors, id selectors and class selectors.
**NOTE** The graphically represented playing cards were created using an online library. I did not use them to fulfill any of the requirements, just to make the page look a little nicer. Here is the library https://selfthinker.github.io/CSS-Playing-Cards/#more.

## Technical Achievements
- **Tech Achievement 1**: When the data in the server is edited using the add/edit data form, the data is instantly updated in the "leaderboard" results table, including the updated derived field. This data is updated by sending the data to the server, where the data is edited, then it is sent back to the client where the table is updated.

### Design/Evaluation Achievements
- **Design Achievement 1**:
Student 1:
1. Kyriacou
2. It took the user a second to figure out how to use the form, but other than that they had no problems.
3. They thought the leaderboard looked best above the add/edit data form.
4. I made sure to put the leaderboard above the add/edit data form based on their feedback.
Student 2:
1. Feiss
2. The user did not have any problems. As soon as they started using the program they did not run into any problems.
3. They thought it looked great and didn't have any problems.
4. I wouldn't change anything because they thought it was good.
