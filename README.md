Readme
---

## Rate Your Books
**Links**:
Github: https://github.com/lewasserman/a2-shortstack
Glitch: https://a2-lewasserman.glitch.me/

Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.

This project allows users to rate their books. They add the title, author, and release year of a book along with their rating of the book on a scale of 1-5 where 5 is the highest rating. Once this book's information is submitted it will be shown on the screen along with all of the other books that the user has entered and rated. A derived field called rank has been added. The higher ranked the book the more the user likes the book. Rank is calculated such that those with the highest ratings are ranked highest and when more than one book has the same rating the more recent book will be ranked higher than the older book.

I used the flexbox for my positoning technique. To use this application, enter book information and press submit. You can add as many books as you would like, but they must be added one at a time.

-This application has a server which serves files and maintains a dataset with 4 given field and one dervived field.
-The entire dataset is shown at all times.
-There is a form through which users can add items (books) into the server's memory.
-I used the fields rating and year to determine my dervived field "rank".
-I created an HTML form with label and input components inside of the form (along with one button).
-The results are shown in a table and are on the same page as the form.
-All of the pages validate (I entered the glitch link to the index page into the validator clue, which says that there are no errors or warnings to show).
-I styled the application using the same colors as my previous Assignment 1.
-I used element, ID, and class selectors when applying styles.
-I used a flexbox for the positioning and styling of the primary visual elements in the apalication
-I  used the "Montserrat" Google Font for all text.
-My CSS is in an external stylesheet which is more maintainable and readable.
-I use Javascript in the script tag in the head of the index.html file.
-I have an HTTP Server that delivers all necessary files and data for the application, and also creates the required Derived Fields

## Technical Achievements
- **Tech Achievement 1**: This is a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. The form remains on the top of the page for the entire duration of the application. There is a table on the bottom of the page which starts off empty as there is no intial data on the server side. As books as submitted and added to the server-side data, the display of the table is also updated to reflect the new books.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
-Think-Aloud 1:
Task 1: Enter 3 books, two of which have the same rating and all of which have different release years.
1. Last Name:
-Baker (Roomate)
2. What problems did the user have with your design?
-filler
3. What comments did they make that surprised you?
-filler
4. What would you change about the interface based on their feedback?
-filler

-Think-Aloud 2: Venard (Roomate)
