## Jelly Bean Guessing Game
This is a basic guessing game combining a jelly bean guessing and hot or cold. The major features of the project include:
- Flexible layout 
- HTML form that validates the inputs
- Automatically updating guess list to keep track of old ones
- Server that keeps track of guesses and asserts when the correct guess is reached (gives hints along the way)

## Technical Achievements
- **Basic CR Operations**: Used the HTML form to read and validate user input which posted the data to the node server
- **Server Logic**: Calculated the difference between the guess and the actual number of jellybeans to give a hint for guessing. 

https://github.com/mgovilla/a2-shortstack/blob/1b0769e1d30d2bc2d9e730e6d9c38a5815696afa/server.improved.js#L60-L61

- **Responsive Table Display**: Made the table display the object without hardcoding the headers in so the data can be changed easily in the future by just changing the form

https://github.com/mgovilla/a2-shortstack/blob/1b0769e1d30d2bc2d9e730e6d9c38a5815696afa/public/js/scripts.js#L27

- **Updating Photo**: When the user guesses correctly, they are alerted and the image changes to a new jar of jelly beans. To implement this, I had to create a custom GET endpoint that returned the current photo and have the browser request it on load and when the alert occurs. 

https://github.com/mgovilla/a2-shortstack/blob/1b0769e1d30d2bc2d9e730e6d9c38a5815696afa/server.improved.js#L29-L30

- **CSS Styling**: Created several styles to make the page flexible and look ok.


### Design/Evaluation Achievements
- **Design Achievement 1**: Kyle McFatter enjoyed playing the jelly bean game and everything seemed to work well. It took a few more guesses than I expected to get the answer (about 12) which means the hints could be better. He also mentioned that I could add more colors.
