//Require external packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Require .env file for db createConnection
require("dotenv").config();

//Require internal modules
//potential modularization
//View queries
//add employees, roles, departments
//update or delete existing data

//connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: `${process.env.DB_PASSWORD}`,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

function begin() {
  inquirer
    .prompt([
      {
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.task) {
        case "View All Departments":
          console.log("User requested to View All Departments");
          viewDepartments();
          break;
        case "View All Roles":
          console.log("User requested to View All Roles");
          viewRoles();
          break;
        case "View All Employees":
          console.log("User requested to View All Employees");
          viewEmployees();
          break;
        case "Add Department":
          console.log("User requested to Add a Department");
          addDepartment();
          break;
        case "Add Role":
          console.log("User requested to Add a Role");
          break;
        case "Add Employee":
          console.log("User requested to Add an Employee");
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          console.log("User requested to Update an Employee Role");
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
      process.exit();
    });
}
////Potential functionality to add to project
// Update employee managers.
// View employees by manager.
// View employees by department.
// Delete departments, roles, and employees.
// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

function viewDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results); //console.table also writes index column
    begin();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    begin();
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employee`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    begin();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the new Department?",
      },
    ])
    .then((response) => {
      db.query("INSERT INTO department SET ?", {
        name: response.departmentName,
      });
      begin();
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "empId",
        type: "input",
        message: "What is the ID number for the employee who is being updated?",
      },
      {
        name: "newRole",
        type: "input",
        message:
          "What is the name of the new roll this employee will belong to?",
      },
    ])
    .then((response) => {
      db.query("UPDATE employee SET ? WHERE ?;", [
        {
          title: response.newRole,
        },
        {
          id: response.empId,
        },
      ]);
      begin();
    });
}

begin();
