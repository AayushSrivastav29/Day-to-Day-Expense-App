const Expense = require("./expenseModel");
const Users = require("./userModel");

//one to many
Users.hasMany(Expense)
Expense.belongsTo(Users);

module.exports={
    Users,
    Expense
}