Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Stefano Jordhani   
Link: https://a2-sjordhani22.glitch.me/
## Hotel Reviews
The goal of this project was to create a prototype two-tiered web application which utilizes HTML, CSS, JS, and Node.JS functionality. The web application will include active communication between the client and the server over the life of a user session. For my project, I decided to make a hotel review website where you will enter the hotel name, location, and will give it a score based on cleanliness, service, and amenities. Once you submit a review, it will be added to the server's memory and will display in the results table where you can go back and edit/delete the review later on. You will also see that there is an additional field called 'Overall Score' that has been added. For the container around the form I used a flex-box display layout (CSS positioning technique).  
NOTE: I tested my website mainly on Mozilla Firefox but also did some testing through Google Chrome

## Technical Achievements
- **Single-page App**: The web application I created is a single-page app that contains both the form to input data for new entries, as well as the results table that refreshes when changes are made to the dataset that is contained in the servers memory. 
- **Edit/Delete Functionality**: In addition to getting the add data functionality, I also was able to get the edit and delete data functionality working. 

### Design/Evaluation Achievements
- **Button Animation**: One small design achievement was the animation that the user sees when they hover over a button. To achieve this I simply had CSS selectors for the buttons and then created a CSS selector for the buttons with ':hover' appended to describe what should occur when the user hovers. The fade-in effect was created by adjusting the opacity of the background as a user hovers over a button. 
- **Design Evaluations**:  
Task: Create a hotel review, make a change and edit your review, and then delete the review.  
#### Evaluation 1   
1. Viera 
2. The user did not seem to have any problems with the design. They were able to navigate the page just fine and complete the task that I specified with ease. 
3. The user did not make any surprising comments but the user did comment on the neatness of the layout.
4. Based on the feedback, I don’t know if there is anything that I would necessarily change. But from my own experience working on my website, if there was more time I would make changes so that the webpage behaves correctly and does not get distorted when the window is resized.

#### Evaluation 2
1. Burke 
2. The user mentioned that instead of setting the input values (hotel name and hotel location), it would be better to just give a preview where the intial value of the input field is an empty string but the "Enter Hotel Name" still shows up as a preview. This means that as soon as the user types the preview goes away instead of having the user have to delete the "Enter Hotel Name Here". Another thing that the user mentioned was to not allow a user to submit new data without filling out the fields since currently you can add a review with the default input values. Lastly, the user made a good point that I had recognized regarding the sizing of things. The user mentioned to make the web page look the same on different sized screens and to have the whole form show upon loading the webpage. 
3. The user did not make any comments that surprised me. They did recommend to add another field though that will allow a user to write an actual review. 
4. Changes I would make would be to have the input fields only show as a preview and put restrictions on submitting reviews with the default values. I would also spend more time looking at the layout and figuring out how to make the visual aspect of the website the same regardless of the size of the screen that the user is viewing it from. 
