
var machine = require("./modules/machine");

var test = require("./data/columbia.json");

//machine.train("./data/columbia.json").save("./data/machine.json");

//machine.load("./data/machine.json");

machine.talking( function( question )
{
  console.log( question );
});

machine.exit(function() 
{
  console.log('Wanna try again?');
  process.exit(0);
});

