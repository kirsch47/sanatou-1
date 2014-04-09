
var machine = require("./modules/machine");

var test = require("./data/columbia.json");

machine.train("./data/columbia.json").save("./data/machine.json");

//machine.load("./data/machine.json");

machine.talking( function( question )
{
    console.log("PARSING..");
  
    var symptome = {};
    var codes = question.trim().split("+").forEach( function(element)
    {
       symptome[ element ] = 1;    
    });
  
    var answer = machine.predict( symptome );
    var cali = machine.predict( {} );
  
    var hitliste = [];
  
    for( var item in answer )
    {
      hitliste.push( { "diagnose":item, "proba": answer[item] - cali[item] } );
    }
    hitliste.sort( function( a,b ) { return b.proba-a.proba; });
  
    for( var i = 0; i < 3 && i < hitliste.length; i++)
    {
      if( hitliste[i].proba > 0.01 )
      console.log( hitliste[i].proba.toFixed(5), hitliste[i].diagnose );
    }
});

machine.exit(function() 
{
  console.log('BYE BYE');
  process.exit(0);
});

