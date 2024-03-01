import inquirer from "inquirer";
import chalk from 'chalk';
let loop = true;
let allStudents = [];
function grade(marks) {
    if (marks >= 80) {
        return 'Grade A-1';
    }
    else if (marks < 80 && marks >= 70) {
        return 'Grade A';
    }
    else if (marks < 70 && marks >= 60) {
        return 'Grade B';
    }
    else if (marks < 60 && marks >= 50) {
        return 'Grade C';
    }
    else if (marks < 50 && marks >= 40) {
        return 'Grade D';
    }
    else {
        return 'Fail';
    }
}
console.log(chalk.bgBlueBright('\n*** Student Management System ***\n'));
async function data(array) {
    do {
        let ans = await inquirer.prompt({
            name: 'menu',
            type: 'list',
            choices: ['1. New Student Form', '2. Search Student by ID', '3. Show all Students', '4. Update Record', '5. Delete Student Record', '6. Exit']
        });
        if (ans.menu === '1. New Student Form') {
            var newStd = await inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: chalk.green('Enter your Name: ')
                },
                {
                    type: 'number',
                    name: 'Age',
                    message: chalk.green('Enter your age: '),
                    when(newStd) {
                        return newStd.name;
                    }
                },
                {
                    type: 'input',
                    name: 'Id',
                    message: chalk.green('Enter Student ID: '),
                    when(newStd) {
                        return newStd.Age;
                    }
                },
                {
                    type: 'number',
                    name: 'Percentage',
                    message: chalk.green('Enter your Percentage: '),
                    when(newStd) {
                        return newStd.Id;
                    },
                },
            ]);
            newStd.Grade = grade(newStd.Percentage);
            allStudents.push(newStd);
            console.log(chalk.redBright('\n****  Data Entered Successfully  ****'));
        }
        ;
        if (ans.menu === '2. Search Student by ID') {
            let enterId = await inquirer.prompt({
                type: 'input',
                name: 'enterId',
                message: 'Enter Student ID: '
            });
            for (let i = 0; i <= allStudents.length; i++) {
                if (enterId.enterId == allStudents[i].Id) {
                    console.log(allStudents[i]);
                    break;
                }
            }
        }
        if (ans.menu === '3. Show all Students') {
            console.log(allStudents);
        }
        if (ans.menu === '4. Update Record') {
            let updateRecord = await inquirer.prompt({
                type: 'input',
                name: 'enterId',
                message: 'Enter Student ID: '
            });
            for (let a = 0; a <= allStudents.length; a++) {
                if (updateRecord.enterId == allStudents[a].Id) {
                    let update = await inquirer.prompt({
                        type: 'list',
                        name: 'update',
                        choices: ['Update Name', 'Update Age', 'Update Percentage'],
                        message: 'Select'
                    });
                    if (update.update === 'Update Name') {
                        let updateName = await inquirer.prompt({
                            type: 'input',
                            name: 'updateName',
                            message: 'Enter Name: '
                        });
                        allStudents[a].name = updateName.updateName;
                        console.log(chalk.redBright('\n*** Record Updated Successfully ***\n'));
                        break;
                    }
                    if (update.update === 'Update Age') {
                        let updateAge = await inquirer.prompt({
                            type: 'input',
                            name: 'updateAge',
                            message: 'Enter Age: '
                        });
                        allStudents[a].Age = updateAge.updateAge;
                        console.log(chalk.redBright('\n*** Record Updated Successfully ***\n'));
                        break;
                    }
                    if (update.update === 'Update Percentage') {
                        let updatePer = await inquirer.prompt({
                            type: 'number',
                            name: 'updatePer',
                            message: 'Enter Percentage: '
                        });
                        allStudents[a].Percentage = updatePer.updatePer;
                        allStudents[a].Grade = grade(updatePer.updatePer);
                        console.log(chalk.redBright('\n*** Record Updated Successfully ***\n'));
                        break;
                    }
                    break;
                }
            }
        }
        if (ans.choices === '5. Delete Student Record') {
            let deleteRecord = await inquirer.prompt({
                type: 'input',
                name: 'enterId',
                message: 'Enter Student ID: '
            });
            for (let p = 0; p <= allStudents.length; p++) {
                if (deleteRecord.enterId == allStudents[p].Id) {
                    delete allStudents[p];
                    console.log(chalk.red('\n*** Student Record Deleted Successfully ***\n'));
                    break;
                }
            }
        }
        if (ans.choices === '6. Exit') {
            loop = false;
        }
    } while (loop);
}
;
data(allStudents);
