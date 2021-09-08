## Todoish
Todoish is a web application that emulates some functionalities of Todoist, a todo list app. You can input tasks, what category they fall under, the due date, the priority, and Todoish will calculate an importance field so you can see what you should be working on (as someone who uses Todoist to stay organized, I wish they had something like this!)

Link: https://a2-o355.glitch.me

## Technical Achievements

### Use of GET/POST/PATCH/DELETE methods
Todoist uses four rqeuest types for the various functions. /getData gets the Todo list data, /postData posts up a new todo list task, /patchData patches (edits) a todo list item, and /deleteData deletes a todo list task.

### Inline editing
Todoish has inline editing within the table. This means that you can edit a task in the table, then update that entry, and then that's pushed to the server.

### Deleting data
Todoish allows users to delete data with the Delete button or the Done button. They do exactly the same thing.

### Derived data
The importance field is derived on the server. It is calculated by doing 100 - ((priority of a task) * (ceiling of how many days it is until that task is due)). 100 is the highest importance value, 0 is the lowest importance value. This will prioritize higher priority tasks, then tasks due earlier than others.

### Use of the Luxon library
Luxon is used to calculate date differences for the importance field. Although this could have been done using the built-in Date class, I wanted to expose myself to Luxon as I've used (the now deprecated) Moment.js in many of my projects before, and Luxon is generally considered the successor to Moment.js.

### Dynamic table usage
The table is rendered on the client side using data retrieved from the server. 

## Design achievements
No user feedback research was done, but I used the standard Arial web font.