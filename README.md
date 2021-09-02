## pogchat.io
Nathan Klingensmith https://a2-iamparadoxdotexe.glitch.me/

My website is a simple chatroom app that supports account authentication, non-live messaging, message editing, and message deletion.

##### *Instructions* 
To enter that chat, create an account with a username and password. Passwords are made securing using [bycrpt's](https://www.npmjs.com/package/bcrypt) salting and hashing algorithm.

Once logged in, you should see all current messages in the database. You can add a new message with the input box at the bottom. Once you have sent message, you can edit it's content or delete it entirely using the icon buttons located on the message. *\*You can only edit and delete your own messages.*

##### *Layout Method*
Chat messages pulled from the server are organized using a flex-box. If there are too many messages to display on-screen, the flex-box becomes scrollable.
```
display: flex;
flex-direction: column;
gap: 0.75rem;
height: 100%;
overflow-y: auto;
```

## Technical Achievements
* **Mustache Templating**:  Implemented [Mustache.js](https://www.npmjs.com/package/mustache) for component templating. 
    - I used **Mustache** to programmatically add message card components to the website. Server data is provided to each message to display the correct information and ensure message editing features point to the correct message based on its `id`.
- **Message Data**:  Utilized a JSON file to persistently store an array of message objects.
    - Each message object contains five fields: `id`, `username`, `admin`, `content`, and `submitted`.
        ```
        id: "b608c34b-f150-4235-bd92-e092a05f9fe8"
        username: "Paradoxdotexe"
        admin: true
        content: "Welcome to pogchat.io!"
        submitted: "2021-09-02T15:57:01.040Z"
      ```
    - To create a message, a user provides their username and the message content. The server automatically assigns a UUIDv4 id (via [uuid](https://www.npmjs.com/package/uuid)) and submission time (via [luxon](https://www.npmjs.com/package/luxon)) to the object. Lastly, the `admin` field is derived based on if the username equals "Paradoxdotexe" or not (my username).
    - Message data is stored in `data.json` and can be easily retrieved through the `/results` GET endpoint.
* **Account Authentication**: Implemented [bcrypt](https://www.npmjs.com/package/bcrypt) for creating a hash table for account password verification.
    - I used **bcrypt** to salt and hash plaintext passwords for secure storage in a hash table located at `hashes.json`.
    - I added a `/authenticate` POST endpoint that can be used to create a new account or login to an existing one. In both cases, success returns the user's hash and failure returns a *401 Unauthorized Error*.
    - For persistent authentication against messaging endpoints, the user's returned hash is used to re-verify the user's identity.
- **Messaging Endpoints**: Added `/add`, `/delete`, and `/update` POST endpoints for modifying the message database.
    - The `/add` endpoint takes a username, content, and a hash and adds a new message to the database if the hash matches the hash table entry.
    - The `/update` endpoint takes a message id, new content, and a hash and updates the specified message's content if the hash matches the hash table entry.
    - The `/delete` endpoint takes a message id and a hash and deletes the specified message if the hash matches the hash table entry.

### Design Achievements
* **Page Styles**: Many style rules were added throughout the application.
    - Style rules are split up amongst `styles/global.css`, `styles/index.css`, `styles/theme.css`, and `templates/mustache.css`.
    - Many dynamic rules were added to react to the classes `joined` and `rendered` being programmatically added to the document body during different events.
- **Transition Effect**: Added styles to create a smooth transition effect between the login and chat pages.
    - Style rules were added based on the dynamic `joined` class to detect once the user has joined the chatroom and update styles accordingly to transition components to and from the page.
* **Focus Accessibility**: Focus styles were added to all inputs and buttons to support keyboard accessibility.
    - The `::focus` selector was used to add visible style changes to focused inputs and buttons, making it easy to navigate the page using only a keyboard.
