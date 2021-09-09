## Car Value Generator

This project assignment attempts to place a price on the car based on the following 4 factors:
Purchase Price, Age of the Car, Number of Major Repairs, and Miles Driven.
Based on these 4 factors, the server will spit out the approximate value of the car using dollar notation.

Regarding the CSS positioning techniques

### Form

The form was positioned using the grid technique.

### Table

The table was positioned using the flex technique.

There are no other instructions that are needed to use this site. One important note however is that the site is designed
to only delete one element from the table at a time. (while deleting 2 at the same time seems to work, deleting 3 seems to
cause problems.)

## Technical Achievements

- **Tech Achievement 1**: Based on the discord messages and clarification provided adding the delete implementation can count as a Tech Achievement.
  After adding a car (row), you can simply delete the row by checking the box on the right-hand column and then pressing the delete entry
  button.
- **Tech Achievement 2**: One cool feature I added was fading in the most recent element to the row. This combined with the
  black text allows the user to better identify which row was just added to the table. To do this I had to do some array manipulation
  to set a custom ID for the last element of the array then use CSS and JS to manipulate the DOM to change the color and fade it in.

### Design/Evaluation Achievements

- **Design Achievement 1**: For my first Design Achievement I am piggybacking off the second Tech Achievement. The animation
  used for the new entry's in the table helps the users identify which row was most recently added to the list. If I were to expand on this
  project, I would use that feature to make the last row "easily editable" (not sure how yet) since if a user were to make
  a mistake it would likely happen on the most recently added row.

- **Design Achievement 2**: User Study

GOAL: Add some cars to the table and generate some "Estimated Value"'s then delete the entry's to return to an empty list.

1. Provide the last name of each student you conduct the evaluation with.
   <br> <br>
   <u> Healy </u>
   <br> <br>
2. What problems did the user have with your design?
   <br> <br>
   <u> Healy mentioned that the form was a bit difficult to read as there was a lack of color contrast. </u>
   <br> <br>
3. What comments did they make that surprised you?
   <br> <br>
   <u> I was surprsied to find that the most recently added row being black posed some confusion for the user. </u>
   <br> <br>
4. What would you change about the interface based on their feedback?
   <br> <br>
   <u>1. I would change the color scheme to make the form easier to read <br> 2. Use larger increments on the form inputs
   to make it easier to increment or decrement the value. </u>
