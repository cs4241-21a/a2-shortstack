# Assignment 2 - Matthew Spofford

<https://a2-MatthewSpofford.glitch.me>

# Homework Agenda

My project is a homework todo list web application. The user can add multiple homework assignments with various properties such as the assignment name, course, and due date. Based on the date that the assignment was created on the server, it will then calculate the derived priority level field of the homework based on how soon the due date is. Currently the priority level is hardcoded as the following:

- High Priority: due date within 1 day of assignment creation
- Medium Priority: due date within 3 days of assignment creation
- Low Priority: due date above 3 days of assignment creation (anything else)

The users are also capable of completing assignments (which removes it from the server), as well as editing assignments (which directly modifies the on server data).

Currently there are some minor issues with the date handling, since it is using JavaScripts built in Date object. Due to the default timezone that the built-in Date object uses, the due dates occasionally appear off by a day, depending on what time the assignment was created (since there is currently no way of entering time easily on the due date form). This could be a fix for the future.

This project also implemented flex boxes for the main agenda page, as well as the homework data prompt.

## Technical Achievements

- **Data can be Received from the Server**: By modifying the *server.improved.js* file's implementation of GET requests, I reconfigured it to also send the homework data to the web browser. The web browser would then parse the JSON objects tied to the homework data, and then display it nicely on the table. Internally, the homework data is saved as a key/value pair for easier retrieval for later requests. The key for each homework is the creation date information of that assignment, as it is unique enough to not cause conflicts.

- **Data can be Added to the Server**: Similarly to receiving data, I also modified the server backend so that when the browser requested to add a new homework for a POST request, the backend would correctly handle this. This would then create a new key/value pair for easier retrieval later. This process would also handle derived value calculations by computing the priority level as described above. This is uses the key/value pairing previously mentioned for easy modification. The UI is then updated accordingly with the brand new entry.

- **Data can be Modified on the Server**: Similarly to adding data, I also modified the server backend so that when the browser requested to modify homework through a PUT request. When the user presses the *Edit* button, this displays the current homework information. Once they press submit, this sends the request. The functionality of the POST and PUT request handling is basically identical, except instead of creating a new entry during the PUT handling, it just replace the previous entry. This is uses the key/value pairing previously mentioned for easy modification. The UI is then updated accordingly.

- **Data can be Removed from the Server**: When a user marks an assignment as completed, this sends a DELETE request to the server. The server then uses the key/value pairing to easily delete the given entry. The UI is then updated accordingly.

### Design Achievements

- **Created a Popup Window for Data Entry**: When the user presses the *Edit* or *New Homework* button, this creates a popup window for the user to enter homework information. This is much cleaner to view than if the user had to enter information directly into the main homepage of the tool.
