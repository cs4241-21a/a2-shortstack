## Investment Calculator

This is a basic investment calculator for calculating ROI based on investments' revenue and costs. Flexbox CSS positioning was used for organizing fields, labels, and buttons on the form.

Users can add new entries to the investment table via the **Add Entry** button. Information for these entries must be input via the form prompt that appears after clicking this button before they are saved. Users have the ability to **Delete** or **Edit** entries at any time after they are saved to the server by clicking the related icon.

## Glitch

https://a2-nickfrangie.glitch.me/

## Technical Achievements

- **Up-To-Date Single Page App**: This app is single page and provides users the ability to submit investment information while always keeping the client-side up-to-date with that updated server data.
- **Add/Modify/Delete**: Users have the ability to add, modify, and delete investments from the app. The page will remain up-to-date with any of these changes. (This was originally a core requirement, then elevated to a Technical Achievement via the Prof in Discord).
- **Tooltip**: Used a custom-created tooltip to define ROI in the table header.
- **Additional Form Functionality**: Added additional form functionality beyond the requirements of the project, including self-populating the form data for editing entries, and hiding/unhiding the form when the user selects or deselects a entry to be added.

### Design/Evaluation Achievements

- **User Experience Study**:

  #### User Experience Study 1

  1. **Participant**
     - Rockmael
  2. **Problems**
     - Negative investment costs result in the calculated ROI behaving unexpectedly.
     - When both investment cost and revenue are 0, NaN% is displayed as the calculated ROI.
  3. **Comments**
     - The non-dark mode color palette hurt their eyes.
     - They appreciated the prevention of non-numeric input in the number input boxes.
     - They found the icon buttons simple and intuitive to understand.
  4. **Changes**
     - Edge cases involving zeros and negative numbers should be properly handled.
     - Clarification of revenue versus profit can be acheived with a tooltip similar to that on ROI.

  #### User Experience Study 2

  1. **Participant**
     - McEvoy
  2. **Problems**
     - Input for texboxes is uncapped, so the table width expands endlessly to fit longer investments strings.
     - Inputting multiple zeros as a cost or revenue results in all zeros being logged to the table.
     - Overflow for larger numeric values causes no cost/revenue to be saved.
     - Add Entry button overwrites previously written (but not submitted) form data without confirmation.
  3. **Comments**
     - User noticed that my quick-and-dirty delete implementation actually refreshes the page.
     - User discovered that special unicode characters work with the investment string.
     - Color palette disliked.
  4. **Changes**
     - Capping of input values to not overflow or overexpand the table.
     - Add number validation before saving numbers to JSON.
