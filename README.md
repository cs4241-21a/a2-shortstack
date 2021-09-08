Readme
--------

## Your Web Application Title
Finance Tracker: https://a2-hmkyriacou.glich.me/
* You can sign in with the default usernames: hmkyriacou, joeSmith, cooluser
* You can click 'sign up' to create a new user.
* The table will display all assets of the user.
* Clicking 'Modify/Delete Assets' will allow you to add new assets using the form that pops up.
* To delete assets, click on the row you want to delete. A striketrhough will apear across the row.
* Clicking 'Submit Changes' will add the asset to the users assets and delete any selected rows.

HTML:
* I used one form for entering a user name and another form for entering information about a new asset.
* A user can view all their entries stored in the server in the table under their username.
* Passes all tests on the Validator website (except for getting rid of default form action).

CSS:
* I used flexboxes to center the elements on the screen and align the buttons.
* I used element, child-element, id, and attribute selectors 
* I used the Source Code Pro font from Google Fonts.

JavaScript:
* My server side logic takes the given price and creates a random "current price" then calculates the current profit/loss of the asset based on those two fields. It also creates an ID for each asset.

## Technical Achievements
- **Auto-Updating logic**: When submitting changes (new assets or deleting assets), the front-end will update on submit as the backend is also updating.

### Design/Evaluation Achievements
- **Think-Aloud**: I interviewed my roomates who are in this class to get feedback for my project.
    - Jacob Feiss
        - UI Should have a more consistent color scheme
        - UI should be more colorful
        - Need some sort of notification when there is an error
        - Dosent like the font
    - Loren Diloreto
        - UI is a little complicated when you are signed in
        - Bug after trying to sign up with empty username
        - Current price should change, maybe use an API and update
    - I ended up doing some modifications to my color scheme and font and also fixing the bug that was encountered after getting this feedback
