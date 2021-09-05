# Calorie Tracker
Jack Ayvazian (jpayvazian) https://a2-jpayvazian.glitch.me/

This is an application to track your calorie intake as a diary of food items with the amount of calories per serving, and how many servings consumed. The server will derive the total calories for each item based on how many servings were entered. Once an item is added using the submit button, it will display in a table where the item can be deleted or edited. Upon clicking the edit button beside an item, a new form below will be filled in with the current field values, and the number of servings can be changed and the table will update by clicking the "update" button. 

The CSS positioning technique I used was flexbox, where I have a flex-container div wrapping flex-item divs, and this allowed me to display the data table beside the add food form. I used CSS styles by element selectors, classes, and id's.

## Technical Achievements
* Created a single page app which always displays the current server-side data. Console will also log current state of server data after each action.
* Handle different POST cases for '/submit', '/update', and '/remove', where updating is a two function process of first filling the "update servings" form with the current contents of the item selected, and then sending the POST after hitting the "update" button. For these cases I had to track the indicies of the data table to preform the action on the correct item
* Added checks for some invalid form inputs such as negative calories/servings, and for duplicate food item names. The reason duplicates are not allowed is because it makes more sense to update the number of servings in that senario. The app will alert the user if they try to submit/update these invalid inputs.

## Design Achievements
* Interface testing:
* Kept the food name and calories per serving read-only (with gray background color of the text field to indicate this to the user) when updating the number of servings. This is because if you are changing the food item entirely, it makes more sense to delete and/or add a new item. 
