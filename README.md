Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Car Registry

## Your Web Application Title
My project is a simple car registry website. All you have to do is enter in the required fields and press "Submit Information" and it will appear in the table on the right. The derived field I have is the age of the car, which is determined based off the year the car was made and the current year. The CSS positioning technique I used was grid layout. I have two headers above the grid and then the form and table are side by side in the grid. I was only able to test on Google Chrome. 

## Technical Achievements
- **Tech Achievement 1**: Using a combination of HTML forms, tables, and server requests, I was able to make a single-page app that keeps updated with user input. The data is then sent to the server where it gets the derived field (car age) and then returns it to the page. Then the table is updated by adding a row with the data from the server.

- **Tech Achievement 2**: I was able to add the delete functionality to the app, however I was unable to get an update/edit funcitonality to work, so I abandoned it for now. I guess half credit for this would be appropriate.

- **Tech Achievement 3**: My form performs many error checks on the user's input. First, it checks if all the fields are filled in. Second, it checks if the year inputted is actually a number. Then (if the year is a number), it checks if the year given is between 1886 and the current year (this is because cars were first invented in 1886 so it's impossible to have one older than that and, for the purpose of this app you can only, you can only have a car model that goes up to the current year). If any check fails it alerts the user and allows them to make edits. Then there is a check on whether the plate number is the appropriate length (between 5 and 8 characters according to US standards). Lastly, it checks if the plate number inputted is already in the registry, and if it is they won't be allowed to add it.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
