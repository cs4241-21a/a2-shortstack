Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Procrast-inator
Procrast-inator asks the user for their assignments/tasks that they need to complete, their deadline, and how long they think it will take to complete. Whenever the user makes a change such as adding a new task, editing an existing task, or deleting an existing task, the server will automatically perform the change and recalculate a schedule for completing the tasks that allows the user to wait as long as possible. The list of tasks is displayed using a grid element. The site is at [a2-rjstebe.glitch.me](a-rjstebe.glitch.me) and the site has been tested, and works well with Google Chrome, and Microsoft Edge.

## Technical Achievements
- **Tech Achievement 1**: When the website loads, and whenever the user clicks a delete or submit button, the data regarding the requested change is sent to the server in a json format, and after processing the change, and updating the starting times for the tasks, the server sends back the current list of tasks in order of starting time as a response to the frontend's original request. This means that as long as multiple clients are not viewing the page at the same time, the task list will always display the current data.

### Design/Evaluation Achievements
- **N/A**:
