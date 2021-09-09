Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
Due: September 9th, by 11:59 AM.
Joseph Scheufele
---

## Your Web Application Title
This web app runs a math game that the user can play. It is timed, the game continues until the user makes a mistake and the game ends. After the game ends, a form will become visible to the user, who has the option of submitting their score along with a nickname, age, region. Once the user has submitted the score for the first time, the contents of the data.json file will be made visible by the server persistently as the user continues to play and update the scoreboard. There is also a link to the color picker I used to create my color palette. 

I used the css grid to sort the game interaction section (i.e. start button, prompt, answer, correct) from vertical alignment to horizontal alignment. I then used the flex box to justify and align content of the entire body to the center. I also used the flex-box to align the form elements right, centered and stacked.

The results are displayed at the bottom of the page in the form of a table. 

The derived field is the seconds/correct field, all it does is divide the time it took the user to complete the game by the number of correct answers the user got to get the average speed of the user.

The server maintains a tabular dataset in the data.json file.

I used numerous css selectors, element selectors like: body, table, td, th, *. I also used id selectors like: hide_game, start, timer, and many others with the '#' character infront.

I used the google Exo font throughout the project.



## Technical Achievements
- **Creating a Single Page App**: Using the submit button to display the contents of the server's data successfully achieves the capability of having a singe-page app that shows the contents of the data as they are being updated. To do this I simply remove all the innerHTML of the table body, then I run a for loop over the whole data set, which was returned by the server as a promise. Each loop of the for loop creates one row of the table.
