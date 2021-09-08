Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Jump Rope Penguin
Jump Rope Penguin is a very simple minigame where you jump rope as a penguin!

After a game over, users are able to input in their first and last name before submitting their score. The score will then appear on the scoreboard. The scoreboard allows the user to check out all of their scores, as well as delete or modify their score. When editing the scoreboard, entries will update automatically!

My server stores multiple fields: the player's score, first name, last name, unique ID, and their rank.

My derived field is the rank score. Based on their minigame score, users are ranked starting from 1st place. Those with the same score are also given the same rank.

HTML: I used multiple html tags including h1, div, form, button, and table. The HTMl validated when using https://validator.w3.org/#validate_by_uri

CSS: I used various CSS styling in an external CSS stylesheet. I used various selectors, including element selectors, class selectors, and ID selectors. I used a CSS grid for laying our parts of my webpage, such as placing my buttons next to each other as well as to allow me to place multiple elements on top of each other. I also used Google Fonts instead of the regular font.

Javascript: I used javascript for sending/fetching data from the server as well as to make the minigame.

Node.js: I used an HTTP server to store and deliver all my data for the app. It also contains the functions for determining the rank for each game entry.

**This webpage was tested and developed in Firefox.**


## Technical Achievements
- **Tech Achievement 1**: I created a mini game. I used animations to create a jump rope type mini game where the user can click a button to jump. I had to take into account the different logics for making a game, like how to start it and when does the game end.
- **Tech Achievement 2**: Single page application that always shows the current state of the server-side data. Whenever any of the buttons(Submit, Edit, Delete) are called on the page, it also immediately calls a function that makes a post request to the server, which then modifes the data and returns it. The returned modified data also immediately calls a function that updates the results table visible on the page.
- **Tech Achievement 2**: Added ability to edit/delete data from table

### Design/Evaluation Achievements
- **Design Achievement 1**: I had some students(one from CS4241 and one who was not) test out my webpage and give me feedback
    * Tran
        1. 
    * Sunray(not a student from the class)
        1. They had some trouble figuring out how to edit and delete scores. This was understandable as I had only used icons for editing(a pencil) and deleting(trashcan) an entry so it might not have been obvious for everyone.
        2. I was surprised by how much difficulty they had trying to figure out how to reset the game. They kept trying to reset the page in order to restart the minigame. This was because I had made it so that you could not replay the game until you submitted the score.
        3. I realized that some people might not be comfortable with submitting their score just to replay the game. If I had to make changes, I would make it so that you can replay the game after you lose regardless if you submit your score or not. I should also probably add more text for certain parts of the webpage explaining how it works, like with editing and deleting.


---

Referenced code from the following pages to make the jump rope minigame:
https://github.com/Beat0154/easiest-game-ever
https://codepen.io/johanmouchet/pen/OMgwMg
