DROP DATABASE IF EXISTS employees_db;

--create employees database--
CREATE DATABASE employees_db;

--select the database for 'use' so all the following code will affect the employees_db
USE employees_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
    FOREIGN KEY (role_id)
    REFERENCES role(id) --whats going on here?--
    ON DELETE SET NULL
);