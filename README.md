## Shortstack web application - created by William White

https://a2-willwht.glitch.me

Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.
This application is a demonstration of a project which makes use of both a client and a server, which has been created using CSS, HTML, and (primarily) Javascript.  This application uses the 'auto' property to have its elements automatically adjust to the screen it is being viewed on.

To use the application, visit the link at the top of this README, and fill in the forms at the top left of the page.  Click the submit button once all three have been filled in, and the page will populate itself with additional rows listing the data you entered.  The page will create an alert to let you know if any of the fields for data entry contain invalid data (empty strings and negative numbers), and will then let you resume entering data.

The derived field for this application is the "professional?" field.  To be a professional, one must have a score of 100 points or greater - people who are professionals have their corresponding grid value set to "true," and those who are not have theirs set to "false."

## Technical Achievements
- **Tech Achievement 1**: The page has a minor degree of validation to its inputs - no fields will accept empty strings, and the age field will not accept any numbers below zero.  The score field was deliberately designed to accept negative numbers.  I personally that this achievement is worth either one or two points, though I would err towards one point over two.
- **Tech Achievement 2**: The page was designed to be a single-page app which both allows users to input data and see the status of the data stored on the server in real time.  This was done by using responses to return the updated data to the client after a user successfully submits data to the server.  With each successive submission, the client will clear its displayed data, and repopulate the main grid with the updated data.  This achievement was listed to be worth 10 points.
