#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
  addCommand,
  findCommandAndDisplay,
  updateCommand,
  removeCommand,
  listCommands,
  runCommand
} = require('./index');

// Customer Questions
const questions = [
  {
    type: 'input',
    name: 'fullCommand',
    message: 'Original Command?'
  },
  {
    type: 'input',
    name: 'shortCommand',
    message: 'Short Command?'
  }
];


program 
  .version('1.0.0')
  .description('Command Management System')

// Add Command
program
  .command('add')
  .alias('a')
  .description('Add a command')
  .action(() => {
    prompt(questions).then(answers => addCommand(answers));
  });

// Find Command
program
  .command('find <name>')
  .alias('f')
  .description('Find a command')
  .action(name => findCommandAndDisplay(name));

// Update Command
program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action(_id => {
    prompt(questions).then(answers => updateCommand(_id, answers));
  });

// Remove Command
program
  .command('delete <_id>')
  .alias('d')
  .description('Remove a command')
  .action(_id => removeCommand(_id));

// List Command
program
  .command('list')
  .alias('l')
  .description('List all commands')
  .action(() => listCommands());


program
  .command('run <cmdName>')
  .alias('r')
  .description('Run command')
  .action((cmdName) => runCommand(cmdName));


program.parse(process.argv);