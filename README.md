Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
https://a2-nicholasmarkou.glitch.me/
## Image Board

This project contains an html page styled with CSS and containing javascript which connects to a NodeJS server to upload and view images with a title and description. The site uses a grid style positioning, with three post divs per row. The width always scales based on the monitor to create three equally sized boxes, but the heights scale based off the tallest item in the row. I put darker colors for the backgrounds of items on the page so it is easier on the eyes. In addition, this site uses the font Urbanist which is available on Google Fonts. The newest post gets put in the top left corner of the site, and the oldest is the bottom right most post. The server can be hosted by running `node server.improved.js` in your terminal and then going to your local ip address with the port 3000 in your web browser. Data is stored in `imgData.json`, if you want to clear it replace the contents of the file with only `[]`. This page was validated using https://validator.w3.org/.

## Technical Achievements
- **Tech Achievement 1**: The webpage automatically refreshes the data every 2 seconds, and also checks for new posts when an image is submitted by the client or when the page is being loaded in for the first time. The data is then taken in to create a div box that represents a post, containing the title of the post, the image and description. Before saving the data submitted, it checks for `<` and `>` to prevent HTML tags being saved and causing errors within the page. 
