Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Jump Rope Penguin
Jump Rope Penguin is a very simple minigame where you jump rope as a penguin!

After a game over, users are able to input in their first and last name before submitting their score. The score will then appear on the scoreboard. The scoreboard allows the user to check out all their scores, as well as delete or modify their score. When editing the scoreboard, entries will update automatically!

My server stores multiple fields: the player's score, first name, last name, unique ID, and their rank.

My derived field is the rank score. Based on their minigame score, users are ranked starting from 1st place.

HTML: I used multiple html tags including h1, div, form, button, and table. HTMl validated when using https://validator.w3.org/#validate_by_uri

CSS: I used various CSS styling in an external CSS stylesheet. I used various selectors, including element selectors, class selectors, and ID selectors. I used a CSS grid for laying our parts of my webpage, such as placing my buttons next to each other as well as to allow me to place multiple elements on top of each other.

Javascript: I used javascript for sending/fetching data from the server as well as to make the minigame.

Node.js: I used node.js to store and deliver all my data for the app. It also contains the functions for determining the rank for each game entry.


## Technical Achievements
- **Tech Achievement 1**: I created a mini game. I used animations to create a jump rope type mini game where the user can click a button to jump. I had to take into account the different logics for making a game, like how to start it and when does the game end.
- **Tech Achievement 2**: Single page application that always shows the current state of the server-side data. Whenever any of the buttons(Submit, Edit, Delete) are called on the page, it also immediately calls a function that makes a post request to the server, which then modifes the data and returns it. The returned modified data also immediately calls a function that updates the results visible on the page

### Design/Evaluation Achievements
- **Design Achievement 1**: 

---

Referenced code from the following pages to make the jump rope minigame:
https://github.com/Beat0154/easiest-game-ever
https://codepen.io/johanmouchet/pen/OMgwMg
