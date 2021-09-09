## A2 -- Andrew Kerekon -- WPI Student Preferences -- https://a2-akerekon.glitch.me/
For this project, I created a small survey form using the flexbox layout to collect data on WPI students' favorite dorms, dining halls, and spots on campus by class year. I included a "yearsRemaining" field that is derived from both a student's class year (4 for first-year, 3 for sophomore, 2 for junior, 1 for senior, and N/A for graduate students) and their name (the name "Gompei" is an easter egg that results in staying at WPI for another 100 years!). Additionally, pressing the "Step On The Seal" button will add 1 additional year to all undergraduate students in the table and any undergraduate students added before the next reload. This website can be used by scrolling to "Add A Rating" and entering data in all fields (with additional notes being optional), then pressing "Add This Rating!". Additionally, each row can be deleted by pressing the "Delete!" button, which will persist on reload. 

## Technical Achievements
- **Tech Achievement 1**: Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display. 

Based on this achievement and the clarification method in Discord, I implemented a form that adds user data about their name, class year, favorite dorm, favorite dining hall, and favorite spot on campus, and made sure to include a delete button next to each row. This was challenging as I had to calculate a derived field based on these input fields, which I implemented by creating a "yearsRemaining" field that took in a student's class year and name to determine how many years they had left at WPI, and even more if they hit the "Step On The Seal" button that would increment each year remaining by one or if their name was Gompei (Hidden Easter Egg!)!

### Design/Evaluation Achievements
- **Design Achievement 1**: I tested my interface with two students from this class, Federico Galbiati and Steven Tran:

**Evaluation 1 -- Federico Galbiati:**
What problems did the user have with your design? Federico liked the general layout and structure of my website, but noticed a few major bugs: at first, the responseID field would increment even if a user's submission was invalid, resulting in higher and higher responseIDs for valid submissions. Additionally, graduate students used to have a studentYear of "N/A0" instead of "N/A" when the seal was stepped on, as I mistakenly combined a string with a integer and tried to add them. Finally, pressing enter on a textbox when adding in form data would redirect to a non-existent webpage, which I have since fixed.

What comments did they make that surprised you? Federico mentioned that some behavior wasn't expected, such as how stepping on the seal would impact all students, even ones added afterwards.

What would you change about the interface based on their feedback? I reprogrammed the responseID field to only increment on valid submissions, made it so the default value of studentYear was "" instead of "0," and made sure to "return false;" on those input forms to prevent redirecting to a non-existent page.


**Evalulation 2 -- Steven Tran:**
What problems did the user have with your design: Steven liked the design, but felt that the header should have extended across the screen and was surrounded by a border, and also felt that the color scheme was a bit hard to read.

What comments did they make that surprised you? Steven also mentioned how stepping on the seal affected all students, which seemed unfair to students who were added to the form after another person had stepped on the seal.

What would you change about the interface based on their feedback? I'll make sure to change up the color scheme, layout, and borders to something more readable, especially to make it more accessible for all users. I'll also save which students have been affected by the seal to make sure new students do not get punished for something they were not involved in.  

