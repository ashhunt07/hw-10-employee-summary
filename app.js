const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];


async function init() {
    promptManager();
}
// Questions for Manager & create new Manager
const promptManager = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "manager",
                message: "Team Manager Name: ",
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager ID: ",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Manager Email: ",
            },
            {
                type: "input",
                name: "managerOffice",
                message: "Manager Office Number: ",
            },
        ])

    .then(function(input) {
        console.log("manager");
        const manager = new Manager(input.manager, input.managerId, input.managerEmail, input.managerOffice)
        team.push(manager);

        buildTeam();
    });
}


//Create a list of Engineers & Interns
function buildTeam() {
    inquirer.prompt([{
        type: "list",
        name: "build",
        message: "Would you like to add members to your team?",
        choices: ["Add an Engineer", "Add an Intern", "Complete Team"]
    }])

    .then(answer => {
        switch (answer.build) {
            case "Add an Engineer":
                {
                    promptEngineer();
                    break;
                }
            case "Add an Intern":
                {
                    promptIntern();
                    break;
                }
            case "Complete Team":
                {
                    assembleTeam();
                    break;
                }
        }
    });

}



// Questions for Engineer & create new Engineer
const promptEngineer = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "engineer",
                message: "Engineer Name: ",
            },
            {
                type: "input",
                name: "engineerId",
                message: "Engineer ID: ",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Engineer Email: ",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Engineer GitHub: ",
            },
        ])

    .then(function(input) {
        console.log("engineer");
        const engineer = new Engineer(input.engineer, input.engineerId, input.engineerEmail, input.engineerGithub)
        team.push(engineer);

        buildTeam();
    });
}


// Questions for Intern & create new Intern
const promptIntern = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "intert",
                message: "Intern Name: ",
            },
            {
                type: "input",
                name: "internId",
                message: "Intern ID: ",
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern Email: ",
            },
            {
                type: "input",
                name: "internSchool",
                message: "Intern School: ",
            },
        ])

    .then(function(input) {
        console.log("intern");
        const intern = new Intern(input.intern, input.internId, input.internEmail, input.internSchool)
        team.push(intern);

        buildTeam();
    });
}


//Write HTMl file!
const assembleTeam = async() => {
    const HTML = render(team);
    try {
        fs.writeFileSync(outputPath, HTML);
    } catch (error) {
        console.log(error.message);
    }
};




// function call to initialize program
init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```