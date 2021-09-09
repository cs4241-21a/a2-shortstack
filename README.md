---

## Contact Log
Link: https://a2-mjzeolla.glitch.me/
The web application acts as a user contact log for the desired individual. When you run the server the user is prompted with some default data. Then the user can ADD data by using the left-most grid column. The user must enter in a Name, Email, Number, Age, and Notes about the Contact. Failure to enter in the required fields will result in an alert to the user prompting them to enter in all the information. Then one submitted, the Live Data table will update with the new Contact. If a user wants to MODIFY a contact they can hover over a row in the Data Table and click. This will display a pop-up window, which will auto-fill in all the existing contact information. The user can then change that information and choose to update the contact. If a user wishes to REMOVE a contact then they must click on the contact's row in the table, and choose the delete button. When the user refreshes the page all the information PERSISTS, and the data table keeps the contacts. 

The derived field of AGE GROUP is created when a user ADDs a new contact to the log. This field is calculated by checking if the entered contact AGE is within a specific margin of age group. A contact can be a "Child", "Teenager", "Adult", or "Senior". Another Derived Field is the EDUCATION LEVEL field. This field is derived from both the age and current occupation of a contact. If a contact is currently a Student then they will be grouped according to the typical education level for that age. If a contact is working and is above the age of 19, then they are Graduates. else they Never Attended school. Lastly, if someone is unemployed then they are automatically considered to have Never Attended school. Furthermore, the contact number and contact-counter parts of the webpage are derived by counting the total number of contact entries in the webpage database.

For CSS, a grid layout was used to create vertical sections of the website. The Left section is the location of the data table, which stores all the contacts. The Middle section is just a vertical line, used to separate the left and right grid sections. The Right section is where a user enters information to add a contact. A pop-up menu is simulated in the project by creating a Div element to store the content. Everywhere that is not the pop-up menu has its color set to a light grey, and the user can only interact with the pop-up window. Lastly, CSS is used to customize the various fonts, colors, and data tables that occur on the webpage. For example, the fonts Sofia, Trirong, and Roboto are imported from Google Fonts and are used to stylize the data. CSS was also used to create an overhead navigation bar and the hovering effect for the table rows. When a user hovers over a specific row, that row's CSS background-color trait gets changed. 

## Technical Achievements
- **Tech Achievement 1**: Using a combination of CSS, HTML, and JS, I created a single webpage, where users can submit data, edit data and delete data. The data is stored in the form of contact, which has seven specific fields. When the user submits data the data table is updated immediately with the new data from the user. The current state of the server data is always displayed in real-time. The derived fields of Age Group and Education Level are calculated by the program and stored in the database. All data persists on the webpage, even when refreshed until the Node.js server is reset. To accomplish deletion the splice method was used on the data object in the node server. For modifying information the specific index in the database is updated with the new JSON data.

- **Tech Achievement 2**: Using a combination of CSS, HTML, and JS, the user can now modify and delete data from the table. This can be done by clicking on an object in the table and selecting either update or delete. To update an object you can enter new fields about the contact. When you delete the contact a confirmation alert is displayed to the user.

### Design/Evaluation Achievements
- **Design Achievement 1**: Using CSS, JS, and HTML, I implemented a pop-up box for users to enter data into when adding to the Contact Log. This was done via CSS, by creating a div that contains the content and the background sections of the screen. With JS when a user clicks on a table entry in the database the pop-up has the class active added to its class list, causing it to appear. Then once an action is taken the pop-up disappears.

- **Design Achievement 2**: Using CSS, JS, and HTML, I implemented a counter to the textarea input when adding a contact. This was done via CSS, by creating a div that has the innerHTML set to the number of characters. With JS when a user edits the notes textarea the div is incremented by the length in the textarea. This was done using an onEventListener of type 'input' for the textarea.

- **Design Achievement 3**:  
   
**Evaluation 1**:
 1. Name: Steven Tran
 2. Problems with the design: Too bright, green isn't a great color. The counter is not shown for editing notes. Cannot enter Contact without specifying notes.
 3. Comments that surprised me: The website was inaccurate when entering unemployed as an occupation. If unemployed then Education Level is "Never Attended" 
 4. Changes to make: Implement some type of Dark mode for users. + Add the notes counter for editing notes + Create some default behavior for when users don't enter a specific field. For example, if no notes are entered then show an empty string in the table.
  
  
**Evaluation 2**:
 1. Name: Andrew Kerekon
 2. Problems with the design: The table should be able to be sorted by age, number, occupation, etc. There is no input for values, aka you can have a negative age, and put a string of any length. There is no user login, so all the data can be seen by all users. 
 3. Comments that surprised me: The table should be able to be sorted by age, number, occupation, etc. This comment was surprising because I did not even consider this as an option for design elements, and it could be easy to implement. 
 4. Changes to make: Implement some type of user login by creating a log-in screen and storing all the user login info in a map or array. Also, I can implement some bounds on the inputs, similar to the 200 character limit on the notes field. 
