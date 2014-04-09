var readline = require("readline");
var brain = require("brain");
var fs = require("fs");

var machine =
{
  create: function()
  {
    //{ hiddenLayers: [4,2,1], learningRate: 0.3 }
    this.netzwerk = new brain.NeuralNetwork(); 
    
    return this;
  }
  ,
  train: function( filename )
  {
    var params = {
      errorThresh: 0.003, iterations:10000, log:true, logPeriod:5 
    };
    
    this.create();
    
    var trainings = JSON.parse( fs.readFileSync( filename ) );
    
    this.netzwerk.train( trainings, params );
    
    return this;
  }
  ,
  save: function( filename )
  {
    var mathematik = JSON.stringify( this.netzwerk.toJSON(), null,3 );
    
    fs.writeFileSync( filename, mathematik );
    
    return this;
  }
  ,
  load: function( filename )
  {
    this.create();
    
    this.netzwerk.fromJSON( require( filename ) );
  }
  ,
  talking: function( callback )
  {
    this.interface = readline.createInterface(process.stdin, process.stdout);
  
    this.interface.setPrompt('ASK MACHINE> ');
    this.interface.prompt();
    
    var that = this;
    
    this.interface.on("line", function( line )
    {
      callback( line );
      
      that.interface.prompt();
    });
  }
  ,
  predict: function( question )
  {     
    return this.netzwerk.run( question );
  }
  ,
  exit: function( callback )
  {
    this.interface.on("close", callback );
  }
}

module.exports = machine