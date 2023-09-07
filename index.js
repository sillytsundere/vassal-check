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
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
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
  db.query(
    `SELECT role.id, title, salary, department.name AS department 
    FROM role JOIN department 
    ON role.department_id = department.id
    ORDER BY role.id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      begin();
    }
  );
}

function viewEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager 
    FROM employee 
    LEFT JOIN employee as e2 ON e2.id = employee.manager_id 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    ORDER BY employee.id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      begin();
    }
  );
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
  db.query("SELECT name, id FROM department", function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
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
          name: "department",
          type: "list",
          message: "What is the new role's department?",
          choices: function () {
            let choicesArray = [];
            for (let i = 0; i < results.length; i++) {
              choicesArray.push(results[i].name);
            }
            return choicesArray;
          },
        },
      ])
      .then((response) => {
        let departmentId;
        for (let i = 0; i < results.length; i++) {
          if (results[i].name === response.department) {
            departmentId = results[i].id;
          }
        }
        db.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)",
          [response.title, response.salary, departmentId]
        );
        begin();
      });
  });
}

function addEmployee() {
  let newEmployee = {};
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the first name of the new employee?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the last name of the new employee?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the new employee's role?",
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        newEmployee.first_name = answer.first_name;
        newEmployee.last_name = answer.last_name;

        db.query(
          "SELECT * FROM role WHERE title = ?",
          answer.role,
          function (err, results) {
            if (err) throw err;

            newEmployee.role_id = results[0].id;

            db.query("SELECT * FROM employee", function (err, results) {
              if (err) throw err;

              inquirer
                .prompt([
                  {
                    name: "manager_name",
                    type: "list",
                    message:
                      "Who is the employee's manager? If no manager, please select 'NULL.'",
                    choices: function () {
                      let choiceArray = [];
                      for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].first_name);
                      }
                      return choiceArray;
                    },
                  },
                ])
                .then(function (response) {
                  db.query(
                    "SELECT id FROM employee WHERE first_name = ?",
                    response.manager_name,
                    function (err, results) {
                      if (err) throw err;

                      newEmployee.manager_id = results[0].id;
                      db.query(
                        "INSERT INTO employee SET ?",
                        newEmployee,
                        function (err, results) {
                          if (err) throw err;
                          console.log("Employee successfully added.");
                          begin();
                        }
                      );
                    }
                  );
                });
            });
          }
        );
      });
  });
}

function updateEmployeeRole() {
  let newRole = {};

  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "updateEmployee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        newRole.first_name = answer.updateEmployee;

        db.query("SELECT * FROM role", function (err, response) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "updateRole",
                type: "list",
                message:
                  "What would you like to change the employee's role title to?",
                choices: function () {
                  let choicesArray = [];
                  for (let i = 0; i < response.length; i++) {
                    choicesArray.push(response[i].title);
                  }
                  return choicesArray;
                },
              },
            ])
            .then(function (answer) {
              db.query(
                "SELECT * FROM role WHERE title = ?",
                answer.updateRole,
                function (err, results) {
                  if (err) throw err;
                  console.log(results);
                  newRole.role_id = results[0].id;

                  db.query(
                    "UPDATE employee SET role_id = ? WHERE first_name = ?",
                    [newRole.role_id, newRole.first_name],
                    function (err, results) {
                      if (err) throw err;
                      console.log("Employee successfully updated.");
                      begin();
                    }
                  );
                }
              );
            });
        });
      });
  });
}

begin();
