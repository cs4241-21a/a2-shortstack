Glitch url: https://a2-yanglyujimmy.glitch.me

## CS4241 Assignment 2
On the web page, you will see an account table. On the table, it shows everyone's name, savings, and cost. The balance is automatically calculated by the server once you insert new data.

Balance = Savings - Cost

In the scripts.js, there are two functions including addData and deleteData. These two functions send request and wait for response sending back from the server. 

## Technical Achievements
- **Tech Achievement 1**: I add the delete function. So you can delete data by typing the name. I know the user ability is low, since it is not convenient for the user. I will try to improve it later. 
- **Tech Achievement 2**: Once you submit the add data request by clicking the add button, the table will update automatically. The server will receive the request, calculated the derived field, and add the new data into its small database. After that, it will put the database into the response end and send back to the front end. 

### Design/Evaluation Achievements
- **Design Achievement 1**: I tested the user interface with my roommate. 
1. Last name: Wang
2. He didn't encountered any problems while playing with the web page. He added some new data to the table and deleted some.
3. He said it would be fun if the number turns red in the table when the cost is too high. And it is unconvenient for user to delete data in that way.
4. I think I would improve the delete function. I could design a checkbox on each row, so user can delete data by checking the checkbox. 
