# MySQL Employee Database

## Description

This application, built with JavaScript and Node.js is run via the command-line interface and allows users to view and interact with information stored in a database containing company data for departments, roles and employees.

This application was built with Node.js inquirer and mysql2 packages and utilizes JavaScript to access and interact with the database using MySQL commands.

As my first application using MySQL I gained experience with the vast ability of SQL commands and its syntax. Integrating these commands with JavaScript served as an introduction to Object-Relational Mapping and continued to display JavaScript's seemingly endless abilities.

## Installation

To run this application, first download the [repository](https://github.com/sillytsundere/vassal-check) and open in your preferred code editor. Run `npm install` to download the necessary npm package dependencies:

- [MySQL](https://www.npmjs.com/package/mysql) npm package connects to the MySQL database and performs queries

- [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) npm package interacts with user via prompts and receives user input in command-line

Create the database locally by running `source schema.sql` then `source seeds.sql`. Then in the main repository directory run `node index.js` to initialize the application and interact with the database directly from the command-line.

Note on connecting to MySQL Database: after you install the application, to connect to the database and run the application you will need to either enter your own mysql password in the `CreateConnection` function or create your own .env file with your password in it.

## Usage

Once installed and running the application allows users to:

- View departments, roles and employees

- Add departments, roles and employees

- Update an employee's role

A video demonstrating the utility of the application can be viewed at this link: https://drive.google.com/file/d/12CTSopqEA1e0HTkozSLah795JKOnkpc3/view?usp=sharing

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Badges

![Static Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

![Static Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![Statis Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

## How to Contribute

If you have any questions or would like to contribute please contact me at [my Github page](https://github.com/sillytsundere).

## Future Enhancements

If time permits, here are some future enhancements and improvements I would like to make:

- Add additional prompts and functionality:
  - Update employee managers.
  - View employees by manager.
  - View employees by department.
  - Delete departments, roles, and employees.
  - View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
- Find another npm package to improve on use of `console.table`
- Refactor database queries with async/await for Promises
