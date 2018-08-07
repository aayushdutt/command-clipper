
var Datastore = require('nedb')
, db = new Datastore({ filename: './database/fullCommands', autoload: true });

const { exec } = require('child_process');

//Run Command
const runCommand = (cmdName) => {
  commandData = findCommand(cmdName, function(commandData) {
    executeCommand(commandData[0].fullCommand)
  }) 
}

//Execute command
const executeCommand = (fullCommand) => {
  exec(fullCommand, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

}


// Add Command
const addCommand = (cmd) => {
  db.insert(cmd, function (err, newCmd) { 
    console.log(JSON.stringify(newCmd, null, "  "))
  });
}

// Find Command
const findCommand = (name, cb) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  db.find({ shortCommand: search }, { fullCommand: 1, shortCommand: 1 }, function (err, command) {
    cb(command);
  });
}

// Find and Show Command
const findCommandAndDisplay = (name, cb) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  db.find({ shortCommand: search }, { fullCommand: 1, shortCommand: 1 }, function (err, command) {
    console.log(JSON.stringify(command, null, "  "))
  });
}

// Update Command
const updateCommand = (_id, customer) => {
  db.update({ _id }, customer, {}, function (err, updatedCommand) {
    console.log(JSON.stringify(updatedCommand, null, "  "));
  });  
}

// Remove Command
const removeCommand = (_id) => {
  db.remove({ _id }, {}, function (err, numRemoved) {
    console.log("removed: "+ numRemoved)
  });
}

// List Commands
const listCommands = () => {
  db.find({}, function (err, allCommands) {
    console.log(JSON.stringify(allCommands, null, "  "))
  });
    
}

// Export All Methods
module.exports = {
  addCommand,
  findCommandAndDisplay,
  updateCommand,
  removeCommand,
  listCommands,
  runCommand
}
