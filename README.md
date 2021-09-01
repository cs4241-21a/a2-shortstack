## **A2 Submission for Matthew Malone**

## Census Data Application

Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.
My project is a census gathering tool for basic information including Name, Age, and Gender.
All you should have to do is stay in this directory, run npm install, then node ./server.improved.js
The derived field per assignment requirement is twofold. One is a dynamically allocated value called count that gets refreshed anytime updatePage is called.
The second derived field is simply the Adult field. If the user's age is >= 18, the adult field is set to Yes. Otherwise it is set to No. This field is generated and updated whenever an entry is added or modified.

## Technical Achievements

- **Tech Achievement 1**: Using a combination of JS and HTML I created an edit function to modify entries. Click the pencil icon next to any entry to modify and resubmit it. This was challenging as I had to add an extra field to the JSON being sent to the server that wasn't always being set. For example, normal additions to the table do not have the modifyIndex set.
- **Tech Achievement 2**: Using a combination of JS and HTML I created a delete function to delete entries from the table. Click the X icon next to any entry to delete it. This was challenging because I needed to figure out a way to index the row like above. What wound up happening was I dynamically created class names for all new entries and existing ones when the table was populated. These entries named crossX where X is an increasing integer. This crossX value gets sent to the server where it is checked against the index of the appdata table, and the corresponding entry is deleted.
- **Tech Achievement 3**: Using a combination of JS and HTML I made the forms auto-clear and auto-fill when using the Modify Pencil and when successfully submitting an entry so the next person can be entered.

### Design/Evaluation Achievements

All students asked in the study were asked to add several users and modify and delete at least one user.

- **Design Achievement #1**:

  1. Jordhani's Feedback
  2. No visible problems were encountered during this test. However, it was noted that it was insecure to allow anybody to edit entries they did not create.
  3. One comment that was surprising was that the application should register and check who added what user so only the creators can modify their information.
  4. If security was a concern for this iteration, I would certainly add a basic username and password field and register it alongside the entries as a hashed value.

- **Design Achievement #2**:
  1. White's Feedback
  2. No visible problems were encountered even when entering in non-standard unicode characters. One problem noted was that age should be limited.
  3. One comment that surprised me was that entering in a large number for age made it go invisible instead of only showing the leading charcters.
  4. Taking his feedback, I would change the UI so it limited what numbers you could enter for age to a reasonable life expectancy.
