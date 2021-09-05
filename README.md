# Calorie Tracker
Jack Ayvazian (jpayvazian) https://a2-jpayvazian.glitch.me/

This is an application to track your calorie intake as a diary of food items with the amount of calories per serving, and how many servings consumed. The server will derive the total calories for each item based on how many servings were entered. Once an item is added using the submit button, it will display in a table where the item can be deleted or edited. Upon clicking the edit button beside an item, a new form below will be filled in with the current field values, and the number of calories/servings can be changed and the table will update by clicking the "update" button. 

The CSS positioning technique I used was flexbox, where I have a flex-container div wrapping flex-item divs, and this allowed me to display the data table beside the add food form.

## Technical Achievements
* Created a single page app which always displays the current server-side data. Console will also log current state of server data after each action.
* Handle different POST cases for '/submit', '/update', and '/remove', where updating is a two function process of first filling the "update food" form with the current contents of the item selected, and then sending the POST after hitting the "update" button. For these cases I had to track the indicies of the data table to preform the action on the correct item
* Added checks for some invalid form inputs such as negative calories/servings, and for duplicate food item names. The reason duplicates are not allowed is because it makes more sense to update the number of calories/servings in that senario. The app will alert the user if they try to submit/update these invalid inputs.

## Design Achievements
* Interface testing:
    1. Last name of evaluator: Sheehan
    2. No problems, but the total calories for all the items in the table combined could be displayed
    3. The read-only field for the item name could have been more clear
    4. I would display the total daily calories and add a description for the different forms so the user knows updating an item would not change the food's name

* Kept the food name read-only (with gray background color of the text field to indicate this to the user) when updating an item. This is because if you are changing the food item entirely, it makes more sense to delete and/or add a new item. 
