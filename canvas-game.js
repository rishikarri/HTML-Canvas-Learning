
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

//variables and location info of the monster

var monster = new Image(); 
monster.src = "Images/monster.png";
var monsterLocation = {
	x: 200,
	y: 100
}

// Now make an array that holds keys that are currently pressed on and not pressed on
var keysDown = [];

// key up is used when you let go of a key
addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
})

addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true; 
	// when I press left, 37 is now in the keysdown array
})

// score of user 

// 	
//control the speed of my hero

var speedModifier = 1;
var monsterSpeedModifier = 1;

//new destination for monster to drift towardss
var monsterNewDestinationX  = Math.random() * 400 + 40; 
var monsterNewDestinationY  = Math.random() * 400 + 20; 

// create a timer for the game - RK 

	// var secondsOnLoad = Date.now()/1000; 
	// var secondsTimer = setInterval(updateCounter, 1000); 

	// function updateCounter(){
	// 	var now = Date.now()/1000;
	// 	secondsPassed = now - secondsOnLoad;
	// 	console.log(secondsPassed);
	// 	document.getElementById("timer-section").innerHTML = "Total Time Passed: " + Math.floor(secondsPassed) + " seconds"; 
	// }

// Class version
// 2. Add a countdown timer
// Start a game button. 
// When clicked on, the game starts (timer starts, player can move)
// When clicked on, get Date.now() and save iti tot hte current Date 
// When clicked on, get Date.now + 30 * 1000 milliseconds
// Create a setINterval to run every X and inside, recalculate the timer 
// Wehn the difference is < 0, stop the game, clear the timer 


function update(){

	// program character's movement
	if(37 in keysDown){
		if (heroLocation.x >= 40){
			heroLocation.x -= 7 * speedModifier;
		}
	}
	if (38 in keysDown){
		if (heroLocation.y >= 30){
			heroLocation.y -= 7 * speedModifier;
		}
	}
	if (39 in keysDown){
		if (heroLocation.x <= 440){
			heroLocation.x += 7 * speedModifier;
		}
	}
	if (40 in keysDown){
		if (heroLocation.y <= 410){
			heroLocation.y += 7 * speedModifier;
		}
	}

	//program monster's random movement

	

	//if they are the saame, generate another random variable
	if (Math.abs(monsterLocation.x - monsterNewDestinationX) < 32) {
		monsterNewDestinationX = Math.random() * 400 + 40; 
	}else if(monsterNewDestinationX > monsterLocation.x){
		monsterLocation.x += 3 * monsterSpeedModifier;
		// console.log(monsterNewDestinationX, monsterLocation.x);

	}else{
		monsterLocation.x -= 3 * monsterSpeedModifier;
	}
	
	if (Math.abs(monsterLocation.y - monsterNewDestinationY) < 32) {
		monsterNewDestinationY = Math.random() * 400 + 20; 
	}else if(monsterNewDestinationY > monsterLocation.y){
		monsterLocation.y += 3 * monsterSpeedModifier;
		// console.log(monsterNewDestinationY, monsterLocation.y);

	}else{
		monsterLocation.y -= 3 * monsterSpeedModifier;
	}	
	

	// program a check to see if the hero catches the monster

	if(
		(Math.abs(heroLocation.x - monsterLocation.x) <32)&&
		(Math.abs(heroLocation.y - monsterLocation.y) <32)
		
	){
		// console.log("Hero is within 32 of the monster");
		//make monster move if Hero catches the monster
		var newMonsterX = Math.random() * 400 + 40; 
		var newMonsterY = Math.random() * 400 + 20;
		monsterLocation.x = newMonsterX;
		monsterLocation.y = newMonsterY;
		score++;
		document.getElementById("scoreKeeper").innerHTML = "Score: " + score; 


	}else{
		// console.log("Ehh, not close enough");
	}

}

// Program buttons that stop and start the game 
var gameOn = false;

function startGame(){
	gameOn = true;
	
	//user started the game, save the time, ssave the time plus thirty seconds
	gameStart = Date.now(); 
	gameEnd = Date.now() + 30000;
	// Start the setInterval
	timerInterval = setInterval(updateTimer, 1000);
	score = 0;
	document.getElementById("scoreKeeper").innerHTML = "Score: " + score;
}

// Stop game

function stopGame(){
	gameOn = false;
	clearInterval(timerInterval);
	
	
}

// resume game

function resumeGame(){
	gameOn = true; 
	var timerSection = document.getElementById("timerSection");//timer div
	var timerSectionText = timerSection.innerHTML; //Time Left: 29 Seconds
	var timeInString = timerSectionText.slice(11,13);
	//Successfully got the string in text form
	console.log(timeInString);
	// convert it to a number
	timeInNumber = Number(timeInString);
	console.log(timeInNumber + 3);

	gameResumed = Date.now();
	gameEnd = gameResumed + timeInNumber * 1000;


	timerInterval = setInterval(updateTimer, 1000);



	// console.log(timeLeft);
}
// create a new player 

function Player(name){
	this.name = name; 
	this.highscore = 0;
}


//Get pplayer names	

function newPlayer(){
	var playerNameDiv = document.getElementById("player-name");
	// property for an input box is always a value
	var playerName = playerNameDiv.value;
	document.getElementById("greeting").innerHTML = "Hello, " + playerName + "! The town is being overrun by goblins and it is your job to catch as many as you can in 30 seconds! Goodluck!"

	//make a new player
	var player = new Player(playerName);
	playerArray.push(player);
	console.log(playerArray);
}
function updateTimer(){
	var now = Date.now(); 
	var timeLeft = Math.ceil((gameEnd - now)/1000); 
	if (timeLeft === 0) {
		clearInterval(timerInterval);
		gameOn = false;
		document.getElementById("timerSection").innerHTML = "Game Over!";	
	}else{
	document.getElementById("timerSection").innerHTML = "Time Left: " +  timeLeft + " Seconds";
	}
}



var gameStart = 0; 
var gameResumed = 0;
var gameEnd = 0; 
var timerInterval = 0; 
var playerArray = [];
var allTimeHighScore = 0; 
var score = 0; 


function draw() {
	//draws our background image on teh context at the top left corner
	if (gameOn){
		update();
	}
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(hero, heroLocation.x, heroLocation.y);
	context.drawImage(monster, monsterLocation.x, monsterLocation.y);
	requestAnimationFrame(draw);
	
	// request animation frame goes through adn calls draw 60 times a second which draws the background image at 0, 0, the hero and the monster
}

draw();

