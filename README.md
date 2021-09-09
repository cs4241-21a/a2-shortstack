Renee Sawka https://a2-rcsawka.glitch.me

## Homework Agenda Application
This web application functions as a homework agenda, where people can input their assignments, which course they are for, how much each assignment is worth (percentage of grade), and the agenda will output the priority level of the assignment. Users can then edit these entries or mark them as complete once they 'finish' an assignment.

The CSS positioning technique used was the default method, static and a CSS grid was used for layout.

## Technical Achievements
- **Tech Achievement 1**: I implemented the ability to modify/delete items residing in the server's memsory.

- **Tech Achievement 2**: I created a single-page app that provides a form (embedded within the data display) and always shows the current state of the server-side data.

- **Tech Achievement 3**: I made my form using HTML input tags of type button and text. Instead of having a form separate from the data display, I embedded it, allowing users to add/edit/delete rows from the table dynamically. This was very challenging, because as opposed to just taking the server data and recreating a new table every time data is returned to the client, I had to make sure the ids of the objects being modified matched up - this way more directly linking the client with the server as data was passed back and forth.

### Design/Evaluation Achievements

Note: As allowed by a message in the Discord, the studies were not done with people from class.

- **Design Achievement: User Interface Study 1**; 
1. Flanagan 
2. While it was not directly a problem, the lack of error checking made the use of the application different than intended - specifically the ability to have a negative percentage or one greater than 100. They also noted that it would be useful to have it specified that the first row that is already filled in acts as an example, or have it differently colored so it doesn't get mixed up with the user's assignments (though it can be deleted).
3. They mentioned that it would be nice to have sort of an undo functionality, as they were surprised when the mark completed/delete button just removed an entry from the table entirely for good. 
4. I would (and did) add a little box with a slight description of the purpose of the website. I also changed the worth column to grade percentage for more clarity. Lastly, instead of just having the column for my derived attribute blank, I put in a placeholder that says it is calculated automatically. 

- **Design Achievement: User Interface Study 2**: 
1. Rathi
2. The delete functionality wasn't entirely working at the point of the study so it was deleting the wrong row. They also wanted to be able to see the entire assignment - the way it looks now is that if there are too many words it just cuts off and you can't see the rest in the text box.
3. They would want the 'add assignment' button relocated like below, and have the row where you are adding slightly more separated. This way it would be more of like a separate form, with editing/deleting still embedded but the row more distinct from the data.
4. I changed the button saying 'add row' to 'add assignment' for more clarity.
