## The Lame Calculator: https://a2-soifferdtemp1.glitch.me

A simple calculator website that performs the indicated calculation server-side, and then passes that back to the client. This calculator has no other functionality whatsoever, make no attempt to communicate with it.
I used flexboxes to position my webpage, with a large master flexbox encompassing everything then smaller boxes for grouping together related things.
And yes, I used a custom font. It's just barely different from the default.

## Technical Achievements

- **Tech Achievement 1**: On load or submit, server updates with current information. This means multiple people can collaborate, and the server is "always" up to date.

-**Tech Achievement 2**: Upon a client discovering a secret, the server has a chance to "corrupt" a random entry in its memory, altering it in an obvious way.

-**Tech Achievement 3**: "Sophisticated" input-checking using regex to validate inputs, and binary/decimal/string parsing for secret things.

### Design/Evaluation Achievements:

- **Design Achievement 1**:
  Added secrets. No spoilers :) (but you can ctrl-f the sever file for "SPOILERS" to see them)

-**Design Achievement 2**:
User test 1: Last name: Primer? (first name is Ansel)
He found it easy to use the calculator function of the website, but was initially a bit confused on how to find a secret. He clued into the binary message within the notes quickly, though. Nothing of what he said was particularly surprising, except how much fun he seemed to be having looking for secrets. Based on his feedback, I would include a clearer trail to the first secret (via better website design), and different kinds of hidden secrets and links between them.
User test 2: Smith
Again, found it easy to use the calculator function of the website. He required more guidance on how to find the first secret, and was especially confused on how to use the compute button properly, and what sort of input was being looked for. I was surprised by the fact that he didn't seem to see the red warning right away, and that he said the website could use less text. In hindsight, I agree, and I would look for ways to again make the first secret clearer and to reduce the amount of text content on the website.
