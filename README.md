---

## Contact Log
The web application acts as a user contact log for the desired individual. When you run the server the user is prompted with some default data. Then the user can ADD data by using the left-most grid column. The user must enter in a Name, Email, Number, Age, and Notes about the Contact. Failure to enter in the required fields will result in an alert to the user prompting them to enter in all the information. Then one submitted, the Live Data table will update with the new Contact. If a user wants to MODIFY a contact they can hover over a row in the Data Table and click. This will display a pop-up window, which will auto-fill in all the existing contact information. The user can then change that information and choose to update the contact. If a user wishes to REMOVE a contact then they must click on the contact's row in the table, and choose the delete button. When the user refreshes the page all the information PERSISTS, and the data table keeps the contacts. 

The derived field of AGE GROUP is created when a user ADDs a new contact to the log. This field is calculated by checking if the entered contact AGE is within a specific margin of age group. A contact can be a "Child", "Teenager", "Adult", or "Senior". Furthermore, the contact number and contact-counter parts of the webpage are derived by counting the total number of contact entries in the webpage database.

For CSS, a grid layout was used to create vertical sections of the website. The Left section is the location of the data table, which stores all the contacts. The Middle section is just a vertical line, used to separate the left and right grid sections. The Right section is where a user enters information to add a contact. A pop-up menu is simulated in the project by creating a Div element to store the content. Everywhere that is not the pop-up menu has its color set to a light grey, and the user can only interact with the pop-up window. Lastly, CSS is used to customize the various fonts, colors, and data tables that occur on the webpage. For example, the fonts Sofia, Trirong, and Roboto Condensed are imported from Google Fonts and are used to stylize the data. CSS was also used to create an overhead navigation bar and the hovering effect for the table rows. When a user hovers over a specific row, that row's CSS background-color trait gets changed. 

## Technical Achievements
- **Tech Achievement 1**: Using a combination of...

### Design/Evaluation Achievements
- **Design Achievement 1**: 
