const Expense = require("../models/expenseModel");

//create
const createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const addExpense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.status(201).send(addExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(`error in creating expense: ${error}`);
  }
};

//read
const getExpense = async (req, res) => {
  try {
    const allExpense = await Expense.findAll();

    if (allExpense.length === 0) {
      return res.send(`No expense record found`);
    } else {
      res.status(200).send(allExpense);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`error in retreiving all expense record: ${error.message}`);
  }
};

//delete
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteExpense = await Expense.destroy({
      where: {
        id: id,
      },
    });
    if (!deleteExpense) {
      return res.status(404).send("Expense not found");
    } else {
      res.status(200).send("expense deleted successfully");
    }
  } catch (error) {
    res.status(500).send("Expense cannot be deleted", error);
    console.log(error);
  }
};

//update
const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, description, category } = req.body;

    // First find the expense to update
    const expenseToUpdate = await Expense.findByPk(id);

    if (!expenseToUpdate) {
      return res.status(404).send(`Expense with id: ${id} not found`);
    }

    // Update the expense with new values
    const updatedExpense = await expenseToUpdate.update({
      amount,
      description,
      category,
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).send("Expense could not be updated");
  }
};

module.exports = {
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
