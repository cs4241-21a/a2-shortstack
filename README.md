## Eat
Eat is a rather boring grid game implemented using various web technologies and positioned using CSS Flexboxes. Users can move a blue square up, down, left, or right in an 8x8 grid, to "eat" green "food" squares. Every square eaten is worth one point, and when a user wants to save their progress, they can enter a username and submit their progress to the server (hopefully this is more entertaining than just entering values into a text field).

If the username is already recorded in the server, then the score associated with the username will be incremented accordingly; otherwise, a new entry will simply associate the username with the existing score. Once the data has been submitted to the server, the user's score is reset to zero, and the user is presented with an updated list of all username/score pairs stored on the server.

## Technical Achievements
- **HTML5 Canvas Game**: The core "game" functionality is implemented with clientside JavaScript using an HTML5 Canvas, which responds to user input; it is refreshed 20 times every second to show the user the most recent position of both squares.
- **Single Page App with Recent User Updates**: Whenever a user submits their score, the list showing live scores is updated with the latest data from the server. Submitting results triggers an HTTP POST request, and that request returns the server's memory to the client; the live scores list is refreshed with this response data.
- **Modify User Data**: Using application logic, whenever a new user score is submitted to the server, the server checks to see whether a score for the submitted username exists. If it does, then the score for the username is simply updated. With this method, modifying data on the server is possible.
- **Web Frameworks Implemented**: Eat is powered by the VueJS framework, and implements some styles from the Bootstrap CSS framework. However, all key project requirements were reimplemented according to project requirements. 

### Design/Evaluation Achievements
N/A
