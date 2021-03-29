var request = require('request');

const chalk  = require('chalk');

var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
//var urlRoot = "https://api.github.ncsu.edu";

var userId = "Keyodinfire";
var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if( !config.token )
{
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));

if (process.env.NODE_ENV != 'test')
{
	(async () => {
		await listAuthenicatedUserRepos();
		await listBranches(userId, "HW4-345");
		await createRepo(userId,"test-HW4-345");
		await createIssue(userId, "HW4-345", "Issue-Test", "This issue is a test");
		await enableWikiSupport(userId,"HW4-345");

	})()
}

function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

async function getUser()
{
	let options = getDefaultOptions("/user", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {

			resolve( JSON.parse(body).login );
		});
	});
}

function listAuthenicatedUserRepos()
{
	let options = getDefaultOptions("/user/repos?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if( error )
			{
				console.log( chalk.red( error ));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log( name );
			}

			// Return object for people calling our method.
			resolve( obj );
		});
	});

}

// 1. Write code for listBranches in a given repo under an owner. See list branches
async function listBranches(owner,repo)
{
	let options = getDefaultOptions("/repos/" + owner + "/" + repo + "/branches", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {
			
			//console.debug( options );
			resolve( JSON.parse(body) );

		});
	});
}

// 2. Write code to create a new repo
async function createRepo(owner,repo)
{
	let options = getDefaultOptions("/user/repos", "POST");
	options.body = JSON.stringify({name:repo, description: 'test', private: false});

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {
			//console.debug(options);
			if (response.statusCode == 422){
				console.log("Repo already exists. ");
				let options = getDefaultOptions("/repos/" + owner + "/" + repo, "DELETE");
				request(options, function (error, response, body) {});
				console.log("Repo deleted, please re-run the test. ");
			}
			resolve( response.statusCode );

		});
	});

}
// 3. Write code for creating an issue for an existing repo.
async function createIssue(owner,repo, issueName, issueBody)
{
	let options = getDefaultOptions("/repos/" + owner + "/" + repo + "/issues", "POST");
	options.body = JSON.stringify({title:issueName, body: issueBody});

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {

			resolve( response.statusCode );

		});
	});
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(owner,repo)
{
	let options = getDefaultOptions("/repos/" + owner + "/" + repo, "PATCH");
	options.body = JSON.stringify({has_wiki: true});

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {
			resolve( JSON.parse(body) );
		});
	});	
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;


