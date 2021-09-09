## Morgan's text OwO-ifier
This application is designed to take user input and then convert it into "OwO speak." The specific regex rules implemented on the user messages have these effects:

1. All 'L' or 'R' characters are replaced with 'W' characters, case sensitive.
2. All 'N' characters followed by a vowell are replaced with 'Ny', also case sensitive.
3. All '!' characters are replaced with a text face randomly selected from a predetermined list of faces.

The resulting data from this transformation can be viewed in a table or in a sentence form, at the user's preference. The options for which view is currently active are at the top of the page.

The layout for this page was set up using flexboxes.

## Technical Achievements
- **Tech Achievement 1**: This project implements a single-page design with a full and accurate representation of the server-side data. To implement this, the appdata object which stores form responses is sent to the client whenever they load the page, and then whenever the client submits a form, the server responds back with a copy of the updated data.

### Design/Evaluation Achievements
- **Design Achievement 1**: I conducted a User Acceptance test with one person in this course:
    1. Last Name: Gagnon
    2. There were (intentionally) no instructions on how the user's message would be transformed, so it was a trial-and-error process to discover the way to accomplish the provided task.
    3. There were no real surprising comments, but I was glad that she got some level of enjoyment out of the (admittedly silly) app I made.
    4. She did find a bug with my derived field that prevented her from finishing her task, which I then went back and fixed.
- **Design Achievement 2**: I implemented two different views for displaying the data from the server. As required, I implemented a tabular view using <table> tags, but as this particular app lends itself well to being conveyed as a sentence, I added a second view which displays all server data in sentence form.
