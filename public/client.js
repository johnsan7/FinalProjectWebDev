//This code, var express through app.set('port',3000) is code from lectures and the class. The implementation that I have is the exact same as the lectures
//This program is a game where there are 100 random zip codes from US locations. You have to guess the temperature within 5 degrees without knowing the name
//of the city. You get 3 points for a correct answer and lose 1 point for an incorrect. 

var express = require('express');

var app = express();

var req = new XMLHttpRequest();

app.use(express.static('public'));

document.addEventListener('DOMContentLoaded', drawTable());

//First we will reset the database. When this loads, it will simply draw the table. 

function reset_table()
{
	req.open('GET', 'http://ec2-52-26-46-121.us-west-2.compute.amazonaws.com:1976/reset-table', true);
	req.addEventListener('load', function()
	{
		drawTable();
	});
}
//This is the basic code of the game. 

//Deleted all of the node listeners, this is straight Javascript. 

function drawTable()
{
	
	req.open('GET', 'http://ec2-52-26-46-121.us-west-2.compute.amazonaws.com:1976/', true);
	req.addEventListener('load', function()
	{
		console.log(JSON.parse(response));
	});
	
	
}