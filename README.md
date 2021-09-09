Matt Johannesen (m-d-jo) - A2 Short Stack - CS 4241
View site at https://a2-m-d-jo.glitch.me/

## The Pit
This is a very rudimentary game, where the player creates a fighter to enter "The Pit".  The form provides the server with a few variables (an elemental Strength and a "balance" level), then the server generates more data from that (an elemental Weakness and separate Power/Agility numbers based on the "balance"). After getting set up, the server runs a 10-turn battle between the new fighter and a random opponent from the Roster table - when they're done, the results get posted.

I used element, class, *and* id selectors in my styling.  Both the form and the div containing it are flex containers - one in a row formation, the other in a column formation.

## Technical Achievements
- **Single-page app**: In The Pit, the form and table are visible on the same screen.  The Roster table updates the data from other rows besides the one that was just created (by selecting the row corresponding to a specific fighter).
- **Security**: To avoid pesky cheaters, I tried to restrict how much data gets processed on the client/browser side.  All the battle logic is in the server code, so *in theory*, it should be harder to tamper with using the client.  (I'm sure it's still pretty easy, but I think it's the thought that counts!)

### Design/Evaluation Achievements
- **Styling for two-tone slider bar**: I'm very proud of the slider bar for Power/Agility balance.  The styling uses a few different browser-specific implementations, all of which I tested and seem to work well.  In getting that part working, I learned quite a lot about how messy web standards are - in this case, the Webkit-specific implmentation of this effect seems nearly twice as long as the Mozilla-specific implementation!