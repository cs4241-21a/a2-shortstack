## TODO List

Glitch URL: https://a2-t-goon.glitch.me

A TODO list app. Tasks can be added, edited, or deleted and are all stored on the server. Tasks can be added with a title, description, and priority. The titles of tasks must all be unique and the priorities must be between 0 - 10 inclusive. Editing of task feilds can only be done to the title, description, and priority feilds. Only one task can be edited and saved at a time. If multiple tasks are edited at once only the task in which the 'Save Edits' button is pressed will actually save to the server. There are creation date and deadline feilds in the table but they are readonly. At any given time all of the task data on the server is shown to the client via a html table sorted by priority in descending order. The CSS positioning technique used was flexbox.

![image](https://user-images.githubusercontent.com/32044950/132425509-4098d034-ed90-46d8-b00d-987db80dd84e.png)


## Technical Achievements
- **Tech Achievement 1**: Using a combination of the fetch API and manual DOM manipulations, the tasks table always shows the state of the entire server task datastore.

The majority of the code for this can be found in the updateTasks() function in scripts.js. Additional fetch API calls are made throughout the rest of the file in various places.

- **Tech Achievement 2**: Using a combination of the fetch API and the creation of additional POST endpoints on the server, the client is able to also edit and delete tasks on the server datastore.

This can be found in the /delete and /edit endpoints in the server POST request handler.

### Design/Evaluation Achievements
- **Design Achievement 1**: Think aloud Testing

Tasks: Add, edit, and delete an item on the TODO list.

#### Student 1
- Student Last Name: Odell
- Problems: Tryed to edit and save multiple tasks at one time while that functionality is not supported on the app. Was confused about why only one task saved when a 'Save Edits' button was clicked.
- Suprising Comments: The problem he found (above) unveiled a usability bug that I didn't even consider until this point.
- UI Change: I would either need to make it more clear the only one edited task can be saved at a time or add support in the app logic that allows for the editing of multiple tasks at once. A note about the functionality was added in the paragraph at the top of the app.

#### Student 2
- Student Last Name: Blake
- Problems: Tried to edit a part of the tasks table that was set to readonly.
- Suprising Comments: Said that my UI didn't really have any problems.
- UI Change: I would make it more clear that in the tasks table the deadline and creation date columns are readonly values.
