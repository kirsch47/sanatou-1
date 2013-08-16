var info = require("../package.json");

var request = require("superagent");


exports.deleteRelations = function( req, res )
{
	request
	.post( "http://54.221.197.106:7474/db/data/cypher")
	.send({
		query: "start r=relationship(*) delete r",
		params: {
			nodeId: new Number( 0 )
		}
	})
	.set( { "Accept": "application/json", "X-Stream": "true" })
	.end( function(neo4j)
	{				
		if( neo4j.ok )
		{
			res.header( "Content-Type", "application/json"); 
			res.end( neo4j.text );			
		}
		else
		{
			res.end( neo4j.body.message );
		}
	});
};

exports.deleteNodes = function( req, res )
{
	request
	.post( "http://54.221.197.106:7474/db/data/cypher")
	.send({
		query: "start n=relationship(*) delete n",
		params: {
			nodeId: new Number( 0 )
		}
	})
	.set( { "Accept": "application/json", "X-Stream": "true" })
	.end( function(neo4j)
	{				
		if( neo4j.ok )
		{
			res.header( "Content-Type", "application/json"); 
			res.end( neo4j.text );			
		}
		else
		{
			res.end( neo4j.body.message );
		}
	});
};

exports.upload = function( req, res )
{
	console.log( req.body );
	
	request
	.post( "http://54.221.197.106:7474/db/data/batch")
	.send( req.body )
	.set( { "Accept": "application/json; charset=UTF-8"})
	.set( { "Content-Type": "application/json"})
	.set( { "X-Stream": "true"})
	.end( function(neo4j)
	{				
		if( neo4j.ok )
		{
			res.header( "Content-Type", "application/json"); 
			res.end( neo4j.text );			
			console.log( neo4j.text);
		}
		else
		{
			console.log( "!!!", neo4j.body );
			res.end( neo4j.body.message );
		}
	});
};