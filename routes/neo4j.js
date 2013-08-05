var request = require("superagent");

exports.hello = function(req, res)
{
	res.end("I'm online!");
};

exports.getNode = function( req, res)
{
	console.log("Test node ",req.params.id);
	
	request.post( "http://54.221.197.106:7474/db/data" + "/cypher")
	.send({
		query: "START n=node({nodeId}) RETURN n.Name",
		params: {
			nodeId: new Number( req.params.id )
		}
	})
	.end( function(neo4jRes)
	{
		res.send( neo4jRes.text );
	});
};