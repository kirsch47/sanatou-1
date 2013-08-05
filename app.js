var express = require("express");

var app = express();

var server = require('http').createServer(app);

var routes = require("./routes/neo4j.js");

app.get("/node/:id", routes.getNode );

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
server.listen( 8080 );