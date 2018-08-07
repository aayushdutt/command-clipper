
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
const addCommand = (customer) => {
  db.insert(customer, function (err, newDoc) { 
    console.log(newDoc)
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
const findAndShowCommand = (name, cb) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  db.find({ shortCommand: search }, { fullCommand: 1, shortCommand: 1 }, function (err, command) {
    console.log(command)
  });
}

// Update Command
const updateCommand = (_id, customer) => {
  db.update({ _id }, customer, {}, function (err, updatedCommand) {
    console.log(updatedCommand);
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
    console.log(allCommands)
  });
    
}

// Export All Methods
module.exports = {
  addCommand,
  findAndShowCommand,
  updateCommand,
  removeCommand,
  listCommands,
  runCommand
}
