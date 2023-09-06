INSERT INTO department (name)
VALUES ('space'), 
       ('time'), 
       ('day'), 
       ('night'), 
       ('chaos');

INSERT INTO role (title, salary, department_id)
VALUES ('harbringer', 100000, 5),
       ('omen', 85000, 5),
       ('clock', 90000, 2),
       ('sun', 72000, 3),
       ('moon', 78000, 4),
       ('electron', 95000, 1),
       ('matter', 70000, 1),
       ('dark matter', 63000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Iris', 'Cosmos', 1, NULL),
       ('Bartok', 'Chev', 2, 1),
       ('Felix', 'Raine', 2, 1),
       ('Chloe', 'Weiss', 3, NULL),
       ('Guy', 'Light', 4, 4),
       ('Art', 'Simet', 5, 4),
       ('Shelly', 'Tran', 6, NULL),
       ('Otto', 'Stuff', 7, 7),
       ('Brock', 'Olle', 8, 7),
       ('River', 'Still', 8, 7),
       ('Brea', 'Key', 8, 7);