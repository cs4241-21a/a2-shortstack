Homework Tracker
This app is a simple tool for tracking when assignments are due. It contains 2 pages, an index.html and a results.html. There is no button to access the results.html because all the functionality of that page is included in the index, and the results page was simple added because it was required for the assignment.

The pages use a flex box, with flex-direction: column to display content. They are few items which need to be displayed, and they by default appear on the left side of the screen, so no other formatting was needed. CSS rules were used to limit the width of the table so it does not span the entire page, and to modify the elements of the table to make the table easier to use.

A user can enter a Description/Name of a task, the estimated timeto complete the task, and then set a due date for the task, before clicking the submit button. Afterwards the task will appear in the table below. Then can then add more tasks, or edit or delete the existing task(s). To edit a task, click the edit button then enter the new information in the forms at the top of the page. To delete a task, simply click the delete button. 

## Technical Achievements
Using Javascript, this program always shows the information being held by the server. Whenever a change is made to the data that change is reflected in the table on either page of the app. Data is shown in the table in the same order it is saved on the server. The server only updates the derived field, the time until the due date, when it receives a message from the client, and it sends this new data back to the client in response. Closing the client window and reopening it will still show the data saved in the server inside the table once the page is loaded.

### Design/Evaluation Achievements
There were no design achievements.
