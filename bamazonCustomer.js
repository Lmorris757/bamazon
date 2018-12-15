var mysql = require("mysql");
var inquirer = require('inquirer');
var consoleTable = require("console.table");

// connect to the database 'bamazon'
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "LbmPassword",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

//start function that initializes the display of all products available
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log( "result: "+ res[1]);
        console.table(res)
        var options = [];
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            options.push(res[i]);

        };
        item();
    });


    function item() {
        inquirer.prompt({
            type: 'input',
            name: 'item',
            message: "Please enter the 'Item ID' (located in the first column of the table) of the item you would like to purchase.",

        })
            .then(function (answer) {
                connection.query("SELECT * FROM products WHERE item_id = ?", [answer.item],
                    function (err, response) {
                        if (err) throw err;
                        console.table(response);
                        quantity();
                    })
            })


    };
    // console.log(query.sql);
}



function quantity() {
    inquirer.prompt(
        {
            type: "input",
            name: "quantity",
            message: "How many of this item would you like to purchase?",
           
        })
        .then(function (answer) {
            if (answer >= item.quantity) {
            console.log("Not Enough Stock!");
            } else {
            console.log(answer.quantity);
            }
        })
};
    

    
;
// .then(function(response){

// })

// );





// prompt the user with Q1 [input]
// prompt the user with Q2 [integer input] / IF/THEN function to ensure the order does not exceed the stock
// update the sql database to reflect purchase/remaining quantity
// then show the cost of the items ordered.
;