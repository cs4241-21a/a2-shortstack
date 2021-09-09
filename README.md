Adam Grabowski

https://a2-argrabowski.glitch.me/

## Securities Portfolio

My project is a stock, ETF, or index fund financial portfolio creator. The site gathers information from the user about a security to produce a
portfolio listing. Information that the user must enter include the name of the security, its ticker symbol, its price in dollars, and the amount
of shares that the user owns. The site produces a derived feild that denotes the total dollar amount that the user has invested in the security.
All of the information that the user enters plus the derived feild is used to create a portfolio listing object which is appended to the page.
The CSS positioning technique that was used is Flexbox and instructions on using the application are provided on the site.

## Technical Achievements

- **Tech Achievement 1**: Created a single-page financial portfolio application that provides both an input form for users to submit data and always
  shows the current state of the server-side data. When the user submits information about a security, the server responds, sending back the updated
  data with the derived feild for total investment, and then the client displays the listing. This allows users to maintain a visual representation of
  their portfolio as they add, remove, and edit securities.

- **Tech Achievement 2**: Added functionality that allows users to remove portfolio listings from the table by clicking the "Remove Entry" button.
  Also added functionality that allows users to edit existing portfolio listings in the table by clicking the "Edit Entry" button. This will replace
  the previous portfolio listing with a new listing derived from the input section. The ability to edit and remove entries from a securities portfolio
  is crucial in streamlining the portfolio creation process.

- **Tech Achievement 2**: Added checks and alerts related to the input section which validate the inputs by applying certain preconditions. Specifically,
  checks and alerts that were added include whether or not the fields are empty, have too many characters, or are not numbers when they are supposed to be.

## Design/Evaluation Achievements

Tested the user interface with two other students in the class. Provided a link to the site and expected the user to add, remove, and edit at least
two portfolio listings.

- **Evaluation Achievement 1**:

1. Nicholas Markou provided feedback.
2. He suggested a confirmation alert for edit and not all green background.
3. He said buttons, highlighting, and general layout made sense.
4. I would add edit confirmation and improve background style.

- **Evaluation Achievement 2**:

1. Liam Rathke provided feedback.
2. He didn't expect the edit button to apply to feilds which were on its row.
3. He said functionality for adding and removing entries made sense.
4. I would make edit button more clear in directions and interface.
