// Write code to use inquirer to gather information about the development team members, and to create objects for each team member 

//Team information and details
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//requirements
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//output results
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Pulling into from htmlRender file for styling and layout
const render = require("./lib/htmlRenderer");


//Empty array for team members to be added
const team = [];


//Initialize function and start add members to your team
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

    // Adds manager to team array
    .then(function(input) {
        console.log("manager");
        const manager = new Manager(input.manager, input.managerId, input.managerEmail, input.managerOffice)
        team.push(manager);

        buildTeam();
    });
}


//Run to create new Engineers and interns to add to the team.html file
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

    // Adds engineer to team array
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

    // Adds intern to team array
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


// function call to initialize entire program
init();