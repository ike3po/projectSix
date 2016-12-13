/**
 *   @author Thrasher, Isaac
 *   @version 0.0.2
 *   @summary Project 6 || created: 12.10.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let continueResponse;
let people = [];

function main() {
    setContinueResponse();
    while (continueResponse === 1) {
        populateName();
        editCusInfo();
        printCus();
        writeCus();
        couponOutput();
        setContinueResponse();
    }
    printGoodbye();
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\n Do you want to continue?  Press 0 for no and 1 for yes:  `));
        }
    }
    else {
        continueResponse = 1;
    }
}



function populateName() {
    let fileContents = IO.readFileSync(`data.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        people.push(lines[i].toString().split(/,/));
    }
}

function editCusInfo() {
    let choice, whichPerson;
    while (typeof choice === 'undefined' || choice !== 0 && choice !== 1) {
        choice = Number(PROMPT.question(`Do you want to edit an existing customer or add a new one? [0=edit, 1=new]: `));
    }
    if (choice === 0) {
        for (let i = 0; i < people.length; i++) {
            console.log(`${i} = ${people[i][0]}, ${people[i][1]}`);
        }
        while (typeof whichPerson === 'undefined' || whichPerson < 0 || whichPerson > people.length) {
            whichPerson = Number(PROMPT.question(`Please select person to edit: `));
        }
        insertIntoArray(whichPerson);

    } else {
        let newPersonNum = people.length;
        insertIntoArray(newPersonNum);
    }
}

function insertIntoArray(person) {
    const COLUMNS = 5, LAST_NAME = 0, FIRST_NAME = 1, ID = 2, SERVICE = 3, PRICE = 4;
    people[person] = [];
    for (let i = 0; i < COLUMNS; i++) {
        let finished = 0;
        if (i === LAST_NAME) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter last name: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                } else {
                    console.log(`WRONG!  ${people[person][i]}`);
                }
            }
        } else if (i === FIRST_NAME) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter first name: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else if (i === ID) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = Math.floor((Math.random() * 100) + 1);
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else  if (i === SERVICE) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter what service that the customer received `));
                if (/^[a-zA-Z ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        }  else {
            const MIN_COST = 1, MAX_COST = 10000;
            while (finished !== 1 || typeof people[person][i] === 'undefined' || isNaN(people[person][i]) || people[person][i] < MIN_COST || people[person][i] > MAX_COST) {
                people[person][i] = Number(PROMPT.question(`\nPlease enter the total cost for the service performed: `));
                if (! isNaN(people[person][i]) || people[person][i] < MIN_COST || people[person][i] > MAX_COST) {
                    finished = 1;
                }
            }
        }


    }
}

function printCus() {
    const COLUMNS = 6;
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(people[i][j]);
        }
        console.log(`\n`);
    }
}

function writeCus() {
    const COLUMNS = 6;
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                IO.appendFileSync(`dataX.csv`, `${people[i][j]},`, 'utf8');
            } else {
                IO.appendFileSync(`dataX.csv`, people[i][j], 'utf8');
            }
        }
        IO.appendFileSync(`dataX.csv`, "\n", 'utf8');
    }
}



function couponOutput() {
    if (people [4] === 750){
        console.log(`Congratulation you have received a coupon ${people[1]}`);
    }
}

function printGoodbye() {
    process.stdout.write('\x1Bc');
    console.log(`Thank you for using our software!`);
}