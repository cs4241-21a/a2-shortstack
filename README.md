## The Color Palette Information Getter
This project is designed to allow users to store a collection of colors and view them along with their Hex codes, RGB representations, and HSL representations. The user can add a new color using any of the three formats, and the application will automaticall calculate the other two formats. The user can also edit and delete colors that are already in the collection.

The elements of the page are laid out using a flexbox. This is with the exception of the "Change Theme" button, since it is meant to be at the very top-right of the page.

## Technical Achievements
- The displayed table updates immediately upon a user submitting data
- The npm module color was used to easily convert between different color representations. The color module allows a user to make a color object from many different types of color representations (hex, rgb, hsl, hsv, etc.). Then, the user can call various functions on the object to get various representations of that color.

### Design/Evaluation Achievements
- There is a light and dark theme that the user can switch between. This allows the user to view their color palette on different backgrounds.
