## Tyler Bouwens - Tyler's RPG Dice Roller

[https://a2-trbouwens.glitch.me/](https://a2-trbouwens.glitch.me/)

My site is a database for TTRPG (Table Top Role Playing Game) dice rolling, the standard Dice pack has 7 dice in it, those being 4-sided, 6 sided, 8 sided, two 10 sided, a 12 sided, and a 20 sided dice. I omitted one of said 10 sided dice, which is used for percentages, in favour of the more fun 100 sided d10. The site allows you to specify your or your character's name, the type of dice to roll, the quantity of dice to roll, and a modifier to add to the final result. The table will dynamically display the rolls of everyone using it, and has the ability to delete individual rolls, or clear it all-together.

### Technical Achievements
- **Tech Achievement 1**: Using a function to rewrite table data, the table of data always stays live updated with current information. Thanks to the onload functionality, it also loads the data to the table on loading of the site itself.
- **Tech Achievement 2**: The table data can be deleted, either in part or in whole. I opted not to have a modify functionality, as I figured that went against the spirit of dice-rolling. Table data can be deleted either by specifying one character to delete all entries for, or by roll ID.
- **Tech Achievement 3**: Data in the table can be sorted on Character, and there's a button under clear to do just that.
- **Tech Achievement 4**: Errors messages will dynamically appear, disappear, and reappear in the correct circumstances in the error box.

### Design/Evaluation Achievements
- **Design Achievement 1**: Some specific features utilized: the .hover functionality in CSS, favicon once again, and linear gradient.
- **Design Achievement 2**: Swapped sites with Maria Del Carmen Sacristan-Benjet (msacristanbenjet@wpi.edu)

Task: Add these dice rolls {
  1.	A singular d20 (20 sided dice) with a modifier of 2 using any name as the Character
  2.	4 d6s (6 sided) with a modifier of 6, using a new name as the Character
  3.	A singular d100 (100 sided) with no modifier, but make character the same as the first name

Finally {
  1.	Delete just the second roll (the 4d6s)
  2.	Clear the table

Reflection:
  1) Del Carmen Sacristan-Benjet
  2) The only problem she had was that it was unclear whether modifier was empty for 0, or if 0 needed to be supplied. She also was confused about error message, but that wasn't working at the time of use.
  3) They liked the overall look, and enjoyed the delete by charater feature.
  4) I fixed the error messages based on their feedback, and would also (if given time) would make empty modifer box equal a modifier of zero.
