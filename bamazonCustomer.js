var inquirer = require('inquirer');
var mysql = require('mysql');

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});

//Displays available items then calls the place order function
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('________________________________________________');
        console.log('___________________Inventory____________________');
        console.log('________________________________________________');

        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].id + ' Product Name: ' + res[i].ProductName + ' Price: ' + '$' + res[i].Price + '(Quantity left: ' + res[i].StockQuantity + ')')
        }
        console.log('________________________________________________');
        placeOrder();
    })
}

//Function user orders, fills the order, then new order
function placeOrder() {
    inquirer.prompt([{
        name: 'selectId',
        message: 'Please select the ID of the Item you wish to Buy!',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Invalid ID!'
        }
    }, {
        name: 'selectQuantity',
        message: 'Quantity?',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Invalid Response!'
        }
    }]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
            if (answer.selectQuantity > res[0].StockQuantity) {
                console.log('Insuffcient Quantity.');
                console.log('Order has been cancelled.');
                console.log('');
                newOrder();
            }
            else {
                amountOwed = res[0].Price * answer.selectQuantity;
                currentDepartment = res[0].DepartmentName;
                console.log('Thank you very much for your purchase!');
                console.log('The total comes to $' + amountOwed);
                console.log('');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    StockQuantity: res[0].StockQuantity - answer.selectQuantity
                }, {
                    id: answer.selectId
                }], function (err, res) { });
                //update departments table
                logSaleToDepartment();
                newOrder();
            }
        })

    }, function (err, res) { })
};

//new order or cancel
function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Keep Shopping?'
    }]).then(function (answer) {
        if (answer.choice) {
            placeOrder();
        }
        else {
            console.log('Thank you for choosing Bamazon!');
            connection.end();
        }
    })
};


//pushs the sales to table
function logSaleToDepartment() {
    connection.query('SELECT * FROM departments WHERE DepartmentName = ?', [currentDepartment], function (err, res) {
        updateSales = res[0].TotalSales + amountOwed;
        updateDepartmentTable();
    })
};

function updateDepartmentTable() {
    connection.query('UPDATE departments SET ? WHERE ?', [{
        TotalSales: updateSales
    }, {
        DepartmentName: currentDepartment
    }], function (err, res) { });
};

showProducts();
