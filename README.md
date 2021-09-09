Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js
===

Yihong Xu
https://a2-gp2p.glitch.me

This project is a website that allows user to track their spending and income with budget.

### Basic Features:

- **Expense Tracker**: User can enter a transaction to the server, they can specify its type (income or expense), the
  amount of the transaction, the date it happened, and a customizable note to label that transaction.
- **Expense History**: Display a list of user expenses (and income) by date, shows the total income and expenses for a
  day (derived from table data), and lists each transaction entered by the user. The site also keeps track of the total
  income and expenses for the user.
- **Budget tracker**: The server keeps a record of the user's budget, and they can edit it anytime. When any operation
  was performed and the total expenses gets greater than the budget, an alert notifies the user about it.
- **Implemented Font**: Helvetica or Arial depending on device
- **Positioning Technique**: Flexbox for all cards, and items inside of transaction log cards
- There is no sorting of data, since in the next assignment we will be using an actual database, sorting will easily be
  accomplished.
- There is no unique key for each entry for the same reason as the previous one.

### Technical Achievements

- **Modify Data**: The user can update their budget as needed, and the evaluations will be updated too.
- **Extra Tables**: In addition to the main history table, the use can also set a budget field that is also stored in
  the server. The server can process 5 kinds and 8 possibilities of data input/request instead of only normal input.
- **Nested Data**: The client uploads a list of data, and the server composes it into a nested array of data and do
  necessary calculations to store it like a database. The server then sends nested data to the client, so it can process
  them into displayed nested data (grouped by date)
- Create a single-page app that both provides a form for users to submit data and always shows the current state of the
  server-side data. To put it another way, when the user submits data, the server should respond sending back the
  updated data (including the derived field calculated on the server) and the client should then update its data
  display.

### Design Achievements

- **Optimized Data Display**: Data is grouped by date of the transaction, and the total income/expense for that day is
  calculated by the server as the derived data. If you made money on a day, it will be labeled red, otherwise green, and
  grey when they are equal. This makes the website a lot more practically useful and meaningful. The original design was
  just a page with a form and a table to display data. I have made a lot of changes both in the front end and the back
  end to achieve this, including introducing a new nested data storage plan, a card-like design of the page and script
  that generates cards based on date data from the server.
- **Test** your user interface with other students in the class.
	- Specified tasks for testers: Just try and use it to log transactions from today, past, and future, and with or
	  without a "note", try to go below or above budget and change it.
	- Testers:
		- Ashley Burke
			- Was able to use the webapp without instructions
			- Problems:
				- Transaction details don't line up, depending on the length of the text, due to using a particular
				  flexbox property
				- The style of the page and the form input was not unified
			- Surprise Comments:
				- Colors are nice, fresh and clean. I had a hard time figuring out the color scheme with an intention to
				  make it clean, but I look at it too much that I can't judge it myself.
			- Things I would change:
				- Revert back to clearing the "Note" field after form submission
				- Change up the styling of the form inputs
			- Other comments:
				- "I like the classic little calendar thing... reminds me of SoftEng"
				- "I do like the shadow affect of the boxes to make them look like they are elevated"
				- "Overall I really like the UI (very clean) and it all seems pretty straightforward to use"
		- Christopher Vieira
			- Was able to use the webapp without instructions
			- Problems:
				- Was able to submit 0 and negative values (I had restrictions, but they stopped working after some
				  changes)
				- Cards are not sorted by time (Plan to implement more functionalities when we can use a database)
			- Surprise Comments:
				- "I had no trouble completing all the tasks you asked me to do, it was super straight forward!"
			- Things I would change:
				- As mentioned above for each problem!
			- Other comments:
				- "I really like the layout and design, it looks great! The color scheme works well"
				- "I like each set of income and expenses being under a tab for each date"