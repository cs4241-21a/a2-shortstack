
## Your Web Application Title
This project keeps track of a simple contact list including each person's name, phone number and birthday. It also indicts whether to give the person a gift for their birthday. Using this indication and the birthday, the program generates a date 30 days before the birthday as the date to get a gift by. 

When selecting a row to modify/delete something, but click on the table and then the row to focus the mouse. 
Note: Will only allow one entry per name.

CS Positioning: CSS grid to arrange the elements of the form.

Testing Browser: Google Chrome 

## Technical Achievements
- **Tech Achievement 1**: 
The server's handlePost() for submit returns a stringified json with the lastest entry which contained the dervived field. In index.html once the server has responsed, if the entry was being updated the old version is removed from the display table. A new row is added to the display table to show the new entry. 

Supports add, modify, and deleting entries 

### Design/Evaluation Achievements
- **Design Achievement 1**: 

Name: Lee 
Problems: Selecting a row to modify was slightly confusing, especially when only one row was present, so the 
    entry field did not appear to change. 
Comments: A bit confused with the purpose of the generated data
Changes: I would change the heading for the generated data in the table, and or add a note explaining 
    that a date, that would represent when to buy/get a gift by would be generated if the checkbox is clicked. 
    To make the selection more obvious, highlighting the currently selected row in the tabel or another visual cue may be helpful. Also adding a clear all button for the entry fields could make using the fields easier. The fields could also clear once the submit button is pressed which might help clarify the selection and that the submission occured. 
Name: Smith 
Problems: Selecting a row to modify was confusing. Intuitively the user clicked the row to edit it. However, since the table has to be clicked twice when the table is not in focus, the selection did not go through at first which confused the user. Was able to figure out what to do after going through the notes on the page. 
Comments: Interesting to see that the user clicked enter after typing in the birthday date, possibly due to the typical change in focus and or confirmation enter is typically used for. 
Changes: I would apply the same changes mentioned above as the two users encounter similar difficulites. I would also possibibly change the format for the notes to be easier to read (if needed at all after the changes. I would also try to modify the table to remove the focusing click for the table. 