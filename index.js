//Require external packages
// const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Require .env file for db createConnection
require("dotenv").config();

//Require internal modules
//View queries
const view = require("./utils/view.js");
//add employees, roles, departments
//update or delete existing data

//initialize instance of express
// const app = express();

//port handler
//do i need this?
//const PORT = process.env.PORT || 3001;

//express middleware (urlencoded/url parser, json parser)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//connect to database
const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: `${process.env.DB_PASSWORD}`,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
//do i need this in my utils/view.js file?

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
          view.viewDepartments();
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
          break;
        case "Add Role":
          console.log("User requested to Add a Role");
          break;
        case "Add Employee":
          console.log("User requested to Add an Employee");
          break;
        case "Update Employee Role":
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

begin();
