const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//people array
const people = []

//initial manager questions
inquirer
    .prompt([
        {
            message: "What is your manager's name?",
            name: "managername",
            type: "input"
        },
        {
            message: "What is your manager's id",
            name: "managerid",
            type: "number"
        },
        {
            message: "What is your manager's email?",
            name: "manageremail",
            type: "input"
        },
        {
            message: "What is your manager's office number?",
            name: "managerofficenumber",
            type: "number"
        },

    ])
    .then(function (manageranswer) {
        const newManager = new Manager(manageranswer.managername, manageranswer.managerid, manageranswer.manageremail, manageranswer.managerofficenumber)
        people.push(newManager)

        let addNewEmployee = false
        
        //askQuestion function shows list of employee options
        function askQuestion() {
            if (addNewEmployee === false) {
                inquirer
                    .prompt([
                        {
                            message: "Which employee would you like?",
                            name: "employeechoices",
                            type: "list",
                            choices: ["Engineer", "Intern", "I don't want to add any more"]
                        }
                    ]).then(function (employeeAnswer) {
                        if (employeeAnswer.employeechoices === "Engineer") {
                            inquirer
                                .prompt([
                                    {
                                        message: "What is your Engineer's name?",
                                        name: "engineername",
                                        type: "input"
                                    },
                                    {
                                        message: "What is your Engineer's id",
                                        name: "engineerid",
                                        type: "number"
                                    },
                                    {
                                        message: "What is your Engineer's email?",
                                        name: "engineeremail",
                                        type: "input"
                                    },
                                    {
                                        message: "What is your Engineer's GitHub?",
                                        name: "engineergithub",
                                        type: "input"
                                    }
                                ])
                                .then(function (engineeranswer) {
                                    const newEngineer = new Engineer(engineeranswer.engineername, engineeranswer.engineerid, engineeranswer.engineeremail, engineeranswer.engineergithub)
                                    people.push(newEngineer)
                                    askQuestion();

                                })
                        } else if (employeeAnswer.employeechoices === "Intern") {
                            inquirer
                                .prompt([
                                    {
                                        message: "What is your Intern's name?",
                                        name: "internname",
                                        type: "input"
                                    },
                                    {
                                        message: "What is your Intern's id",
                                        name: "internid",
                                        type: "number"
                                    },
                                    {
                                        message: "What is your intern's email?",
                                        name: "Internemail",
                                        type: "input"
                                    },
                                    {
                                        message: "What is your Intern's school?",
                                        name: "internschool",
                                        type: "input"
                                    },
                                ])
                                .then(function (internanswer) {
                                    const newIntern = new Intern(internanswer.internname, internanswer.internid, internanswer.internemail, internanswer.internschool)
                                    people.push(newIntern)
                                    askQuestion();
                                });

                        } else {
                            let renderedPeople = render(people)
                            fs.writeFile(outputPath, renderedPeople, function (err) {

                                if (err) {
                                    return console.log(err);
                                }

                                console.log("Success!");

                            });
                        }
                    })
            };
        }
        askQuestion();
    })

