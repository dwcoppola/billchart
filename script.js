localStorage.expenseId === undefined ? localStorage.expenseId = 0 : false;

function incrementId() {

    localStorage.expenseId = Number(localStorage.expenseId) + 1;

}

function createExpense(name, amountDue, dateDue) {
    
    const expense = {

        'id': localStorage.expenseId,
        'name': name,
        'amountDue': amountDue,
        'dateDue': dateDue,
        'payments': [],
        'totalPaid': 0,
        'isPaid': false,
    
    }

    incrementId();

    return localStorage[`expense-${expense.id}`] = JSON.stringify(expense);

}


function getExpense(id) {

    if (localStorage[`expense-${id}`]) {
        
        return JSON.parse(localStorage[`expense-${id}`])
    
    } else {
    
        alert('No such expense exists.')
    
    }

}

function makePayment(expense, amount, date, confirmation) {

    const payment = {

        'amount': amount,
        'date': date,
        'confirmation': confirmation,
    
    }

    if (!payment.confirmation) {
        payment.confirmation = '';
    }

    expense.payments.push(payment);

    expense.totalPaid += Number(payment.amount);

    expense.amountDue = Number((Number(expense.amountDue) - Number(payment.amount)).toFixed(2));

    if (Number(expense.amountDue <= 0)) {
        expense.isPaid = true;
    }

    localStorage[`expense-${expense.id}`] = JSON.stringify(expense);

}


function getDaysUntilDue(expense) {

    const now = Date.parse(new Date());
    const then = Date.parse(expense.dateDue);

    if (Math.ceil((then - now) / 86400000)) {
        return Math.ceil((then - now) / 86400000);
    } else {
        alert('Something went wrong');
    }

}
