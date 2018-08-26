var inquirer = require('inquirer');
var mysql = require('mysql');
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
    executiveOptions();
});

function executiveOptions() {
    inquirer.prompt([{
        name: 'input',
        type: 'list',
        message: 'Supervisor Tasks:',
        choices: ['1) View Sales By Department', '2) Create New Department']
    }]).then(function (answer) {
        if (answer.input === '1) View Sales By Department') {
            console.log('');
            connection.query('SELECT * FROM departments', function (err, res) {
                console.log('SALES BY DEPARTMENT');
                for (i = 0; i < res.length; i++) {
                    var profit = res[i].TotalSales - res[i].OverheadCost;
                    console.log('Department ID: ' + res[i].DepartmentId + ' | ' + 'Department Name: ' + res[i].DepartmentName);
                    console.log('Overhead Costs: ' + res[i].OverheadCost);
                    console.log('Total Sales: ' + res[i].TotalSales);
                    console.log('Total Profit: ' + profit);
                    console.log('________________________________________________');
                }
                newTransaction();
            })
        }
        else {
            addDepartment();
        }

    })
};

//Prompt the user to see if they would like to perform another transaction or end the connection
function newTransaction() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to perform another transaction?'
    }]).then(function (answer) {
        if (answer.choice) {
            executiveOptions();
        }
        else {
            console.log('Have a good day');
            connection.end();
        }
    })
}

function addDepartment() {
    inquirer.prompt([{
        name: 'department',
        message: 'Enter department name: '
    }, {
        name: 'overhead',
        message: 'Enter overhead costs: '
    }]).then(function (answer) {
        //variable to hold the user inputs
        var department = answer.department;
        var overhead = answer.overhead;
        connection.query('INSERT INTO departments SET ?', {
            DepartmentName: department,
            OverheadCost: overhead
        }, function (err, res) { });
        newTransaction();
    })
};