const express = require('express');
const expenseController = require('../controllers/expenseController');
const router = express.Router();

router.get('/', expenseController.getExpense)
router.post('/add' ,expenseController.createExpense );
router.delete('/delete/:id', expenseController.deleteExpense);
router.put('/edit/:id' , expenseController.updateExpense)

module.exports = router;