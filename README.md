A2-SHORTSTACK
---
By Federico Galbiati (fgalbiati). Published at a2-fedeit.glitch.me.

## Lost&Found
The app requires to login with an existing user. The following four users are available:

- federico, password: abc123
- john, password: aaa111
- amanda, password: ab24
- sophia, password: asdasd5

The Lost&Found app allows to post about lost or found items around campus. Once the user logs in, they can create new lost/found items, edit the ones they created, and delete them as well. However, they can only see (read-only) the items posted by other users.

The app has automatic refresh when adding/editing/deleting elements. It shows the entire table of lost/found items at all times. The user can add/edit/delete elements using the 3 forms (edit hidden until clicked).

The server computes the string "x days ago" as a derived data field using the submission timestamp. This field is computed based on the `timestamp` variable.

The HTML page uses multiple forms for creating new lost/found items. Each row also contains a form with buttons to delete/edit. These buttons are hidden for items not created by the logged in user. The web app displays the app data using two `<table>` elements.

The style is simple but uses various class, element, and ID selectors to change the sizes, border colors, display, and grid properties. Additionally, Google fonts was applied on the body element.

The app uses a CSS grid to manage the content on the page. It contains 3 rows and 2 columns. The 3 rows contain:
1. Description and info of logged in user
2. Lost table
3. Found table
Column 1 contains the description and tables, column 2 contains the logged in user info and the create new item form.

Significant frontend JS was implemented to manage the refresh of the fields, as well as the edit, delete, and creation actions. The page also automatically hides/shows forms as needed.

## Technical Achievements
- **Tech Achievement 1**: 
    - The app is completely single-page. Every time an action is performed (create/edit/delete) the tables are refreshed without changing page or reloading. Login is also managed without changing page.
    - The app allows to not only create, but also edit and delete items from the lists.
    - The app has an additional login form that checks if the user exists in the backend.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
    - Last name: Zeolla
        - The tester suggested adding colors, input validation control, alert on deletion.
        - I think the alert on deletion is certainly something I didn't predict.
        - I would certainly implement all feedback suggested as I fully agree with it entirely.
    - Last name: Kerekon
        - The tester suggested adding input validation, and implementing a log out button.
        - I was suprised by the logout button. I did not expect this suggestion.
        - I would implement a simple logout button which resets the screen, but I would prioritize this if my web app used cookies to maintain the session open.
