# WPI Computer Science SA, TA, and GLA Tracking Sheet
This project allow the user the ability to enter information for WPI Computer Science Department Senior Assistants, Teaching Assistants, and Graduate Learning Assistants. This all contained in a single web page which automatically updates after every action. 

In order to position my elements, I used the CSS grid format. This allowed me to have whitespace on either side of my main content section while also organizing my Input Area and Tutorial Area. 

In order to use my application, please read the Tutorial Area (labeled "How To Use"). This is also shown below. 

How To Use:
- Enter the necessary information in the Input Area.
- When you've entered new information, click Add Entry.
- To remove a item, click the Remove Entry button in the respective row.
- To update a item, input the necessary information you wish the result to contain in the Input Area and add click the respective row's update entry.

## Technical Achievements
- **Tech Achievement 1** (10 points): Using a combination of GET and POST requests, I created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. Every button the user can click leads to a POST request being send to the server. This POST request will return the list of all data entries currently in the server's memory. This also persists through the frontend restarting whether through a page refresh, opening a new page, etc. Every time the page is reset, a GET request gets the updated list of information from the server. This ensures that the client is never out of data and the table won't act buggy when adding that first entry after a refresh.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
