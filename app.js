
var machine = require("./modules/machine");

machine.train("./data/columbia.json", 0.001).save("./data/learned.json");

// TEST DATA FROM https://github.com/harthur/brain
// machine.train("./data/test.json").save("./data/machineTest.json");

//machine.load("./data/learned.json");

var symptome = {};

machine.talking( function( question )
{
  if( question )
  {
    console.log("SYMPTOM TO REMEMBER");
  
    var parts = question.split("=");
    
    if( machine.knows( parts[0] ) )
    {
      symptome[ parts[0] ] = parts[1] ? Number( parts[1] ) : 1;
    }
    else { console.log("WHAT?", "KNOWN SYMPTOMS ARE:", machine.dictionary() ); }
    
  }
  else {    
    var answer = machine.predict( symptome );
  
    console.log("ANALYZING", Object.keys( symptome ).length, "SYMPTOMS" );
    
    var hitliste = [];
  
    for( var item in answer )
    {
      hitliste.push( { "diagnose": item, "proba": answer[item] } );
    }
    hitliste.sort( function( a,b ) { return b.proba-a.proba; });
  
    // NETWORK
    console.log("NEURAL NETWORK SAYS");
    for( var i = 0; i < 5 && i < hitliste.length; i++)
    {
      console.log( hitliste[i].proba.toFixed(5), hitliste[i].diagnose );
    }
    // KLASSIFIER
    console.log("CLASSIFIER SAYS");
    console.log( "-", machine.classify( Object.keys( symptome ).join(" ") ) );
    
    // RESET
    symptome = {};
  }  
});

machine.exit(function() 
{
  console.log('BYE BYE');
  process.exit(0);
});

