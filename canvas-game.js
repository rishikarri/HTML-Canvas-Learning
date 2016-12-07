function swagger(){
	document.getElementById("swagger").innerHTML = "Oh hey"; 
}

// create the canvas tag

var canvas = document.createElement("canvas");

// context for JS to play with
var context = canvas.getContext("2d");

canvas.width = 512; 
canvas.height = 480; 

// Adds canvas to the body of the document
document.body.appendChild(canvas);

// create a background image 
var backgroundImage = new Image(); 
backgroundImage.src = "Images/background.png"; 

//make a variable for our hero

var hero = new Image(); 
hero.src = "Images/hero.png";
var heroLocation = {
	x: 100,
	y: 100 
}

var monster = new Image(); 
monster.src = "Images/monster.png";
var monsterLocation = {
	x: 200,
	y: 100
}

function draw() {
	//draws our background image on teh context at the top left corner
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(hero, heroLocation.x, heroLocation.y);
	context.drawImage(monster, monsterLocation.x, monsterLocation.y);
	requestAnimationFrame(draw);
	// request animation frame goes through adn calls draw 60 times a second which draws the background image at 0, 0, the hero and the monster
}

