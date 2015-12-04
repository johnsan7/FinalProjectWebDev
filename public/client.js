//This code, var express through app.set('port',3000) is code from lectures and the class. The implementation that I have is the exact same as the lectures
//This program is a game where there are 100 random zip codes from US locations. You have to guess the temperature within 5 degrees without knowing the name
//of the city. You get 3 points for a correct answer and lose 1 point for an incorrect. 

//var express = require('express');

//var app = express();

var req = new XMLHttpRequest();

console.log("Client Javascript is running");

//app.use(express.static('public'));

document.addEventListener('DOMContentLoaded', drawTable);

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
console.log("gets into drawTable at least");
	req.open('GET', 'http://ec2-52-26-46-121.us-west-2.compute.amazonaws.com:1976/tables', true);
	req.addEventListener('load', function()
	{
		if(req.status >= 200 && req.status < 400)
		{
			console.log("Request was returned");
			console.log("Respons was: ", req.responseText);
			var response = JSON.parse(req.responseText);
			console.log("after parsing response was: ", response);
			var newTable = document.createElement('table');
			var newHead = document.createElement('thead');		//Create header
			var newRow = document.createElement('tr');
			var newBody = document.createElement("tbody");
			console.log("Created header stubs");		
			var nameTitle = document.createElement('th');
			nameTitle.textContent = 'Name';
			newRow.appendChild(nameTitle);
			var repsTitle = document.createElement('th');
			repsTitle.textContent = 'Reps';
			newRow.appendChild(repsTitle);
			var weightTitle = document.createElement('th');
			weightTitle.textContent = 'Weight';
			newRow.appendChild(weightTitle);
			var dateTitle = document.createElement('th');
			dateTitle.textContent = 'Date';
			newRow.appendChild(dateTitle);
			var lbsTitle = document.createElement('th');
			lbsTitle.textContent = 'Lbs';
			newRow.appendChild(lbsTitle);
			
			newHead.appendChild(newRow);
			//The above should build the header. Next we can do the actual data in the body
			//Now we need to build the body, and to do that we need to do a loop, I think for each will work. 
			console.log("Appended headers to head");		
			for(var thing in response)
			{
				console.log("Appending rows in loop");
				var nextRow = document.createElement('tr');
				
				var nameBox = document.createElement('td');
				nameBox.textContent=response[thing].name;
				nextRow.appendChild(nameBox);
				console.log("Doing name: ", response[thing].name);
				var repsBox = document.createElement('td');
				repsBox.textContent=response[thing].reps;
				nextRow.appendChild(repsBox);
				
				var weightBox = document.createElement('td');
				weightBox.textContent=response[thing].weight;
				nextRow.appendChild(weightBox);
				
				var dateBox = document.createElement('td');
				dateBox.textContent=response[thing].date;
				nextRow.appendChild(dateBox);
				
				var lbsBox = document.createElement('td');
				lbsBox.textContent=response[thing].lbs;
				nextRow.appendChild(lbsBox);
				
				newBody.appendChild(nextRow);
				
				//Above code adds the data row, next rows add the buttons. 
				
				var buttonRow = document.createElement('tr');
				var deleteButton = document.createElement('button');
				var editButton = document.createElement('button');
				
				//The next two blocks hopefully create hidden data items with the id that follows each button.
				//I hope to be able to access them since they are siblings. 
				
				var hidDeleteID = document.createElement('hidden');
				hidDeleteID.name="id";
				hidDeleteID.value=response[thing].id;
				
				var hidUpdateID = document.createElement('hidden');
				hidUpdateID.name="id";
				hidUpdateID.value=response[thing].id;

				
				var deleteText = document.createTextNode("Delete");
				var editText = document.createTextNode("Edit");
			
				deleteButton.appendChild(deleteText);
				editButton.appendChild(editText);
				
				deleteButton.class="deleteButton";
				editButton.class="editButton";
				
				buttonRow.appendChild(deleteButton);
				buttonRow.appendChild(hidDeleteID);
				buttonRow.appendChild(editButton);
				buttonRow.appendChild(hidUpdateID);
console.log("hidden for delete is: ", hidDeleteID.value);
				newBody.appendChild(buttonRow);
				
				// This will be where we add the buttons, leaving that off for now var buttonRow = document.createElement
			}
			console.log("Done appending rows");
			newTable.appendChild(newHead);
			newTable.appendChild(newBody);
			document.body.appendChild(newTable);
			console.log("Table actually got appended");
		}
		else
		{
			console.log("Something wrong with request, response code was: ", req.statusText);
			
		}
	});
	
	req.send(null);
	event.preventDefault();	
}

getElementsByClassName("deleteButton").setEventListener('click', function (event)
{
	console.log("Event listener works for delete buttons");
	
	
});