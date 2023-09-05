

function viewDepartments() {
    query(`SELECT * FROM department`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results); //console.table also writes index column
        begin();
    })
};

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        begin();
    })
};

function viewEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        begin();
    })
};

module.exports = { viewDepartments, viewRoles, viewEmployees };