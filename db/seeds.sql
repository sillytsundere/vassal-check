INSERT INTO department (id, name)
VALUES (5, 'space'), 
       (3, 'time'), 
       (1, 'day'), 
       (2, 'night'), 
       (7, 'chaos');

INSERT INTO role (id, title, salary, department_id)
VALUES (77, 'harbringer', 100000, 7),
       (66, 'omen', 85000, 7),
       (12, 'clock', 90000, 3),
       (33, 'sun', 72000, 1),
       (32, 'moon', 78000, 2),
       (22, 'electron', 95000, 5),
       (16, 'matter', 70000, 5),
       (18, 'dark matter', 63000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (333, 'Iris',	'Cosmos', 77, NULL),
       (112, 'Bartok', 'Chev', 66, 333),
       (223, 'Felix', 'Raine', 66, 333),
       (444, 'Chloe', 'Weiss', 12, NULL),
       (355, 'Guy', 'Light', 33, 444),
       (554, 'Art', 'Simet', 32, 444),
       (777, 'Shelly', 'Tran', 22, NULL),
       (668, 'Otto', 'Stuff', 16, 777),
       (996, 'Brock', 'Olle', 18, 777),
       (228, 'River', 'Still', 18, 777),
       (633, 'Brea', 'Key', 18, 777);