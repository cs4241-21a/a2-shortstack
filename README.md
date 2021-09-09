## Life Progress Counter
This site takes a users name, birthday and gender and computes how far through the average lifespan for their selected gender they are. Use of this app is pretty straight forward, enter the information and click add. To edit existing data make the desired change in the table and then click the update button. To remove simply click the remove button for the associated record. Tying to update a record that has been deleted in another tab will cause the server to crash and all data to be lost. I used a flexbox in order to layout my input prompts. This allowed the input boxes to dynamically wrap as the display shrank in size. Otherwise the table took care of most of the formating for the exisiting records. https://a2-ben-peters.glitch.me/ 

## Technical Achievements
My website automatically fetches any data existing on the server on inital page load and dispalys it below the input form. Additionaly, I have implamented an update and remove button that update the status of the data on the server depending on the action of the user. Data on the server should persist so long as the server doesn't crash.

### Design/Evaluation Achievements
1.  Gallipeau
2.  Interacting with the birthday feild of the form was clunky and the builtin calendar was less intuitive than expected.
    None of the feilds were required to add the user resulting in records without a name or birthday and a bogus value for life lived
3.  Use of "Male" as defualt gender is not the best choice. Process for updating was unclear that you had to click update for changes to take effect.
4.  Change default gender to "Other"
    Require all feilds before allowing a user to add or edit a record. 
    Add instructions at the top of the page with directions on how to update exisiting records.