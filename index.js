#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName; 

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a JavaScript Millionaire?'
    );

    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgBlue("HOW TO PLAY")}
        I am a process on your computer.
        If you get any questions wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...

    `)
};

async function askName(){
    const answers = await inquirer.prompt({
        name: "player_name",
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player';
        }
    });

    playerName = answers.player_name;
}



async function question1(){
    const answers = await inquirer.prompt({
        name: "question_1",
        type: 'list',
        message: 'question\n',
        choices: [
            'choice1',
            'choice',
            'choice',
            'choice'
        ]
    });
    return handleAnswer(answers.question == 'choice1');
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}. That's a legit answer`}); 
    } else {
        spinner.error({ text: "You lose"})
        process.exit(1);
    }
}

function winner(){
    console.clear();
    const msg = `Congrats ${playerName}! \n $1, 000, 000  `;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await winner();
