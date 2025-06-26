document.addEventListener("DOMContentLoaded", initialize);
let currentlyEditingId = null;

// When the page gets loaded, display all users
function initialize() {
    axios.get(`http://localhost:3000/api/expense/`).then((result) => {
        console.log(result);
        const expenseArr= result.data;
        for (let i = 0; i < expenseArr.length; i++) {
        display(expenseArr[i]);
    }
    }).catch((err) => {
        console.log(`error in fetching data`,err);
    });

    // Attach form submit handler
    document.querySelector("form").addEventListener("submit", handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (currentlyEditingId) {
        updateData();
    } else {
        addData();
    }
    // Reset form and clear editId
    event.target.reset();
    currentlyEditingId = null;
    document.querySelector('form button').textContent = 'Add';
}

// Add new user to local storage
function addData() {
    const amount = document.querySelector('#amount').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;

    const expenseDetails = {
        amount,
        description,
        category
    };

  
    axios.post(`http://localhost:3000/api/expense/add`, expenseDetails);
    display(expenseDetails);
}

// Display user on screen
function display(expense) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.setAttribute("data-id", expense.id);

    const text = document.createTextNode(`${expense.amount} ${expense.description} ${expense.category}`);
    li.appendChild(text);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteData(expense.id, li));
    li.appendChild(deleteBtn);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editData(expense));
    li.appendChild(editBtn);

    ul.appendChild(li);
}

// Delete expense from local storage and DOM
function deleteData(id, li) {
    axios.delete(`http://localhost:3000/api/expense/delete/${id}`);
    li.remove();
}

// Populate form for editing
 function editData(expense) {
     document.querySelector('#amount').value = expense.amount;
     document.querySelector('#description').value= expense.description;
     document.querySelector('#category').value = expense.category;

    currentlyEditingId = expense.id;

    document.querySelector('form button').textContent = 'Update';  
    
}

async function updateData(){
    const amount =document.querySelector('#amount').value;
    const description= document.querySelector('#description').value;
    const category= document.querySelector('#category').value;

    let updatedData={
        amount,
        description,
        category
    }

    try {
        const updatedResult = await axios.put(`http://localhost:3000/api/expense/edit/${currentlyEditingId}` , updatedData)
        console.log("updated successfully", updatedResult);

        //refresh list
        refreshExpenseList();
    } catch (error) {
        console.error('Error updating expense:', error);
    }
}

function refreshExpenseList(){
    document.querySelector('ul').innerHTML = " ";

    axios.get(`http://localhost:3000/api/expense/`).then((result) => {
        console.log(result);
        const expenseArr= result.data;
        for (let i = 0; i < expenseArr.length; i++) {
        display(expenseArr[i]);
    }
    }).catch((err) => {
        console.log(`error in fetching data`,err);
    });
}
