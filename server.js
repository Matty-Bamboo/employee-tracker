const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();


// Connect to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_db.`)
  );


async function displayDepartments() {
    try {
        const [rows] = await Connection.promise().query('SELECT department_id, department_name FROM departments');
        console.log('Departments:');
        rows.forEach(row => {
            console.log(`Department ID: ${row.department_id}, Department Name: ${row.department_name}`);
    });
    console.log();
  } catch (error) {
    console.error('Error displaying departments:', error);
  }
}

async function handleOptions() {
    const options = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'add Department',
        'add Role',
        'add Employee',
        'Update Employee Role',
    ]
    const results = await inquirer.prompt([{
        message: 'What would you like to do?',
        name: 'command',
        type: 'list',
        choices: options,
    }]);
    if (results.command == 'View All Departments') {
        displayDepartments();
        handleOptions();
    } else if (results.command == 'View All Roles') {
        displayRoles();
        handleOptions();
    } else if (results.command == 'View All Employees') {
        displayEmployees();
        handleOptions();
    } else if (results.command == 'add Department') {
        addDepartment();
        handleOptions();
    } else if (results.command == 'add Role') {
        addRole();
        handleOptions();
    } else if (results.command == 'add Employee') {
        addEmployee();
        handleOptions();
    } else if (results.command == 'Update Employee Role') {
        updateEmployeeRole();
        handleOptions();
    };
};

handleOptions();