var express = require("express");

var app = express();

var routes = require("./routes/neo4j.js");

app.use( express.bodyParser() );
app.use( "/", express.static(__dirname + '/public') );

app.get("/deleteRelations", routes.deleteRelations );
app.get("/deleteNodes", routes.deleteNodes );
app.post("/upload", routes.upload );

//CONFIGURATION
app.configure('development', function() 
{
	console.log("Development");
});

app.configure('production', function() 
{	
	console.log("Produktion");
});

//PORT
app.listen( 8080 );