## pogchat.io
Nathan Klingensmith https://a3-iamparadoxdotexe.glitch.me/

My website is a chatroom app that supports sending messages and polls in both a public and private chatroom.

##### *Instructions* 
To enter that chat, create an account with a username and password. Passwords are made secure using [bcrypt's](https://www.npmjs.com/package/bcrypt) salting and hashing algorithm.

Once logged in, you should see the **Public** chatroom with public chat messages from all users.
You can add a new message with the input box at the bottom or create a poll by clicking the poll icon. 
Once you have sent a message or poll, you can edit their content or delete it entirely using the icon buttons located at the top right of the message.
*Note: You can only edit and delete your own messages.*
By using the tabs at the top of the chat box, you can switch to the **Private** chatroom; any messages here can only be seen by you.

##### *Challenges* 
The biggest challenge in realizing this application was adding a private chat where each user could securely access their own MongoDB collection for chat messages and polls.
To make this work, I had to add a `room` variable to each chat-related POST request to identify what room to manipulate data for.
In the case of a "Private" room, the chat collection for the specific user was retrieved via their username.

##### *Authentication*
For authentication, I implemented a username and password form that authenticates user credentials using a hash table stored in MongoDB.
This was the simplest authentication method and what I used in Assignment 2. I also implemented a cookie session to support persistent sessions.

* Utilized [bcrypt](https://www.npmjs.com/package/bcrypt) to salt and hash plaintext passwords for secure storage in MongoDB.
* Added a `/login` POST endpoint for creating a new account or logging into an existing one. A cookie is added to the user's browser to store their username and authentication token.
* Added a `/logout` POST endpoint for clearing the active session.
* Added a `/session` GET endpoint for retrieving the active session.

##### *CSS Framework*
Coming soon...

##### *Express Middleware*
I utilize five different middlewares to improve my Express server:
* `compression` was utilized to compress response data sent to the client.
* `express.static` was implemented to serve static image files from the `/public` folder.
* `express.json` was used to parse JSON request bodies in my POST endpoints.
* `cookie-session` was implemented to store a cookie in the user's browser for persistent authentication.
* `view-helpers` was used to log information on whether my users are using the app from desktop or mobile.

## Technical Achievements
* **Achievement**:  Sentence about achievement...
    - I did this...

### Design Achievements
* **Achievement**:  Sentence about achievement...
  - I did this...
