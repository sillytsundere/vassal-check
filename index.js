//Require external packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Require .env file for db createConnection
require("dotenv").config();

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
          addRole();
          console.log("User requested to Add a Role");
          break;
        case "Add Employee":
          addEmployee();
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
////Potential functionality to add
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

function addRole() {
  db.query("SELECT name, id, FROM department", function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    const depChoices = results.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the new Role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the role's salary?",
        },
        {
          name: "departmentId",
          type: "list",
          message: "What is the new role's department?",
          choices: depChoices,
        },
      ])
      .then((response) => {
        db.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)",
          [response.title, response.salary, response.departmentId]
        );
        begin();
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "employeeFirstName",
        type: "input",
        message: "What is the first name of the new Employee?",
      },
      {
        name: "employeeLastName",
        type: "input",
        message: "What is the last name of the new employee?",
      },
      {
        name: "employeeRole",
        type: "input",
        message: "What is the role of the new employee?",
      },
      {
        name: "employeeManager",
        type: "input",
        message:
          "If this new employee has a manager please enter it here or type 'NULL' if they do not have a manager.",
      },
    ])
    //i need to change role and manager names into id's
    .then((response) => {
      db.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          response.employeeFirstName,
          response.employeeLastName,
          response.employeeRole,
          response.employeeManager
        ]
      );
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
      //UPDATE employee SET role_id(INT) WHERE theemployeeidtobechanged
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
