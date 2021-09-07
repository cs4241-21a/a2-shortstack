Name: Aditya Kumar

WPI email: akumar6@wpi.edu

Github Username: hellofellowkids

Glitch link: http://a2-hellofellowkids.glitch.me

Pull Request: a2-hellofellowkids-Aditya-Kumar

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
---

## Simple Survey for College Students
Link: 

This website allows you to fill out and submit a simple survey by clicking the "Take Survey" button. This survey has its responses reported and updated at the bottom of the page along with statistics that can shown/hidden by cliking the "Display Stats"/"Hide Stats" button. These stats derive the most popular responses on the survey. The common CSS positoning techniques used is `display:flex` with `align-items: center` and`justify-content: center`.

## Developer Experience
The inspiration for the questions were to be simple but mainly to create a divide in opinion. This website started with concept shown in this image (created by myself): 
![concept](concept.png)

The main feature I really wanted to implement were modal boxes, popup boxes that appear with information once you click a button that will prompt a survey to appear. Slowly, this webpage came together by research various techniques from videos, assigned readings, and Stack Overflow. I am also really into survey results and the stats behind them so I wanted to also display those as well. I also used a color scheme using: https://coolors.co/generate .


## Technical Achievements
- **Tech Achievement 1**: Using JS and HTML, I was able to allow users to get consistent updates on the client side of the webpage (both stats and survey responses) after a new entry was submitted. A minor additional feature is when they go submit another survey, it does not store the previous submission data AKA the form's input is reset.

- **Tech Achievement 2**: Using JS, CSS, and HTML, I was able to create modal boxes to host my form. Clicking outside the modal box or hitting the "X" icon of the box, closes modal. The modal is opened when a user decides to take the survey or edit a response. The screen dimming effect along with color combinations allow a clean and effective interface for the user.

- **Tech Achievment 3**: Using JS and HTML, the user is able to modify / delete survey responses. Modifying is done by clicking on the corresponding response's pencil icon and it opens the modal box's form with inputs based on the selected response's data. Deletion is as simple as clicking the corresponding trash icons. The updates are shown to the client automatically with both of these actions.

### Design/Evaluation Achievements
Conducted a quick study by providing a link to the webpage and having users leave feedback
- **Evaluation Achievement 1**: 
1. Malone provided feedback.
2. No major problems regarding the design of the webpage
3. They mentioned how the text is identical in the form when submitting a response vs. editing a response.
4. Change the color / text inside the modal box hosting the form to differentiate between a new response vs. a modified response.

- **Evaluation Achievement 2**: 
1. Sheehan provided feedback.
2. No major problems regarding the design.
3. They mention how there is no dupe checking for the "name" field so you can have people with the same name submit multiple responses.
4. Probably make changes to `server.js` code and make the /add POST request go through and ensure no duplicate data or update the data with the same name entry.