## Assignment Tracker
Link: https://a2-jmckeen8.glitch.me/

This website allows users to keep track of assignments for courses. It allows them to specify the course and assignment name, when it's due, the method through which it's turned in (Canvas, Email, etc.). It also has a derived field based off of the due date and the current date that tells the user how many days they have left to work on the assignment. The website displays the upcoming assignments in a table, and when the user has finished the assignment they can click the "Done!" button to remove the assignment from the list.  

This website uses the Flexbox CSS layout, which allows the assignment entry form to be displayed horizontally and centered with even spacing, but also wrap the elements if there's not enough horizontal space in the browser window. 

## Technical Achievements
- **Tech Achievement 1**: This website is displayed as a single-page app where both the assignment entry form and the assignment list table are displayed on a single page. When the user either clicks "Submit" on the form or one of the "Done!" buttons in the assignment list, the server processes the request and sends back a JSON representation of all of the table data for the assignment list, allowing the table to be fully refreshed and have the latest information without the need to refresh the page or go to a different page.
- **Tech Achievement 2**: This website allows users to both add and remove entries from the assignment list. Adding is done through the form, while removing is done by clicking one of the "Done!" buttons in the table. When one of the "Done!" buttons are used, the JSON object sent to the server only has one attribute (as opposed to many for adding a new assignment). This is how the server tells the difference between the two types of incoming requests, and decides how to handle the request appropriately. 

### Design/Evaluation Achievements
- **Design Achievement 1**: Feedback/Think-aloud:
1. Last name of student: Staw
2. What problems did the user have with your design?: The feedback in this area was mostly related to minor details about site aesthetics/look and feel. He said that the CSS styling was a bit plain (which I did end up tweaking a little bit after our thinkaloud, although even more could probably be done in this area) and also mentioned that I had put "Duedate" as one word and he thought "Due date" was better, so I changed that.
3. What comments did they make that surprised you?: He was overall impressed with the workflow of adding/removing assignments, especially with how easy the "Done!" button was to use and understand. It also didn't really take any prompting from me for him to understand how exactly to go about adding/removing the assignments. It was nice to find out I had done a good job of making the interface intuitive and easy to understand.
4. What would you change about the interface based on their feedback?: I would probably put a bit more effort into the CSS styling in particular, adding more colors and making it more visually appealing, etc. That being said I do kind of like the clean look of the current website. 
