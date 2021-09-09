## [Jelly Bean Guessing Game](https://a2-mgovilla.glitch.me/)
This is a basic guessing game combining a jelly bean guessing and hot or cold. The major features of the project include:
- Flexible layout 
- HTML form that validates the inputs
- Automatically updating guess list to keep track of old ones
- Server that keeps track of guesses and asserts when the correct guess is reached (gives hints along the way)

## Technical Achievements
- **Basic CR Operations**: Used the HTML form to read and validate user input which posted the data to the node server
- **Server Logic**: Calculated the difference between the guess and the actual number of jellybeans to give a hint for guessing. 

```js
      let out = ['HOT!', 'warm!', 'cool', 'cold!', 'super cold', 'frozen :('] 
      data.hint = out[[15, 75, 125, 200, 450, Infinity].findIndex(e => diff < e)]
```

- **Responsive Table Display**: Made the table display the object without hardcoding the headers in so the data can be changed easily in the future by just changing the form

```js
        document.getElementById('table').innerHTML = (values[0] != undefined ? `<tr>${Object.entries(values[0]).map(e => `<th>${capitalize(e[0])}</th>`).join('')}</tr>` : '') \
        + values.map(a => `<tr>${Object.entries(a).map(e => `<td>${e[1]}</td>`).join('')}</tr>`).join('\n');
```

- **Updating Photo**: When the user guesses correctly, they are alerted and the image changes to a new jar of jelly beans. To implement this, I had to create a custom GET endpoint that returned the current photo and have the browser request it on load and when the alert occurs. 

```js
  } else if (urlwithoutquery === '/photo') {
    sendFile(response, images[currentImage])
```

- **CSS Styling**: Created several styles to make the page flexible and look ok.


### Design/Evaluation Achievements
- **Design Achievement 1**: Kyle McFatter enjoyed playing the jelly bean game and everything seemed to work well. It took a few more guesses than I expected to get the answer (about 12) which means the hints could be better. He also mentioned that I could add more colors.
