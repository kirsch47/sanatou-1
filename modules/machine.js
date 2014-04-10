var readline = require("readline");
var brain = require("brain");
var classifier = require("classifier");
var fs = require("fs");

var machine =
{
  create: function()
  {
    //{ hiddenLayers: [4,2,1], learningRate: 0.3 }
    this.netzwerk = new brain.NeuralNetwork(); 
    
    this.klassifizierer = new classifier.Bayesian();
    
    return this;
  }
  ,
  train: function( filename, threshold )
  {
    var trainings = JSON.parse( fs.readFileSync( filename ) );
        
    this.create();
    
    this.trainNetzwerk( trainings, threshold );
    
    this.trainKlassifizierer( trainings );

    return this;
  }
  ,
  trainNetzwerk: function( trainings, threshold )
  {       
    var params = {
      errorThresh: 0.04, iterations:10000, log:false, logPeriod:100 
    };
    if( threshold ) params.errorThresh = threshold;
    
    var success = this.netzwerk.train( trainings, params );
    
    console.log("TRAINING ROUNDS", success.iterations, "ERROR", success.error );   
  }
  ,
  trainKlassifizierer: function( trainings )
  {
    for( var i = 0; i < trainings.length; i++) 
    {
      var category = Object.keys( trainings[i].output ).join(" ");
      var words = Object.keys( trainings[i].input ).join(" ");
    
      this.klassifizierer.train( words, category );  
    }
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
  knows: function( item )
  {
    return !!this.netzwerk.toJSON().layers[0][ item ];
  }
  ,
  dictionary: function( item )
  {
    return Object.keys( this.netzwerk.toJSON().layers[0] ).join(",");
  }
  ,
  predict: function( question )
  {     
    return this.netzwerk.run( question );
  }
  ,
  classify: function( question )
  {
    return this.klassifizierer.classify( question );
  }
  ,
  exit: function( callback )
  {
    this.interface.on("close", callback );
  }
}

module.exports = machine