Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js
===
Ivan Martinovic
Link: https://a2-imartinovic-dzaja.glitch.me/

Due: September 9th, by 11:59 AM.

## XXXL Gym Admin Page
This web page is supposed to be a web page for managing gym memberships of a gym I used to go to back home in Bosnia (the gym doesn't have any official website, except for a facebook page: https://m.facebook.com/profile.php?id=100057309077774&refsrc=deprecated&_rdr

The website allows (presumably the admin of the page) to add new gym members to a pre-existing data set, by filling out a form. There are two derived fields: the first one being the id of each individual member and the expiration date which signifies when the membership for a given member expires (and both of these fields are always disabled). The expiration date depends on the join date, and the type of membership (Monthly, Yearly and Lifetime). Please note that the expiration date input field calculated automatically upon changes to the two previously mentioned fields on the client side (for the convenience of the person entering the info) and then after adding the members also on the server side for security purposes. 
The project used a grid positioning CSS technique. It includes an unused header area (possibly in the future a menu/navigation bar) could be put there; an area for positioning the Gym Logo, an area for positioning the form, an area for positioning the primary and secondary buttons, and finally an area for positioning the table.
Using the site should be straight forward: to add a new member simply fill out the form and click the big green button that says "Add New Member" (note: both the client and the server will prevent the insertion of an entry with one or more empty fields). To clear the fields, just click on the "Clear Contents" button.
On the bottom of the website is a table which lists the information about all members which go to the gym. On the right side of each entry there are two buttons/icons: a modify button and a delete button (both can be identified by howevering the cursor over them which displays a label). The delete button deletes the entry. The modify button copies the fields of the corresponding table row into the input fields of the form. It also changes the primary button for adding a new member, to a yellow button which says "modify" (notice also how the Id field now reflects the id of the member we are modifying). Once we make the desired changes to the form's fields, we simply click the yellow button which modifies the entry. To cancel modifying an entry, click on the "Cancel" button. 


## Technical Achievements
- **Single Page App With Form and Current Server-side data**:  Created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. With every request (that isn't a file request) sent to the server, the server responds with by sending the tabular data back to the client. For example: when an entry is modified the client sends the new modified data to the server, the server processes the request, updates its data set, and sends a copy of the dataset back to the client. The client then uses this new dataset to reconstruct the table. 

### Design/Evaluation Achievements
- **Tested User Interface with Jake Feiss**:
1. Feiss
2. The user made comments about the contrast and opacity of the table in relation to the background image. He suggested that they should blend together more.
3. The user liked the page, which I didn't expect since it was only my second ever webpage.
4. I would add some transparency to the form and table elements, and possibly make their color darker.


