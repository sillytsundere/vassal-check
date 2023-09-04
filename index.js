const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

//initialize instance of express
const app = express();

//port handler
const PORT = process.env.PORT || 3001;

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
          viewAllDeps();
          break;
        case "View All Roles":
          console.log("User requested to View All Roles");
          viewAllRoles()
          break;
        case "View All Employees":
          console.log("User requested to View All Employees");
          viewAllEmps()
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

function viewAllDeps() {
    db.query(`SELECT * FROM department`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        begin();
    })
};

function viewAllRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        begin();
    })
};

function viewAllEmps() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        begin();
    })
};

begin();