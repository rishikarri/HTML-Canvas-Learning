
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

//control the speed of my hero

var speedModifier = 1;

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

	var monsterNewDestinationX  = Math.random() * 400 + 40; 
	var monsterNewDestinationY  = Math.random() * 400 + 20; 

	// program a check to see if the hero catches the monster

	if(
		(Math.abs(heroLocation.x - monsterLocation.x) <32)&&
		(Math.abs(heroLocation.y - monsterLocation.y) <32)
	){
		console.log("Hero is within 32 of the monster");
		//make monster move if Hero catches the monster
		var newMonsterX = Math.random() * 400 + 40; 
		var newMonsterY = Math.random() * 400 + 20;
		monsterLocation.x = newMonsterX;
		monsterLocation.y = newMonsterY;
	}else{
		console.log("Ehh, not close enough");
	}

}

function draw() {
	//draws our background image on teh context at the top left corner
	update();
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(hero, heroLocation.x, heroLocation.y);
	context.drawImage(monster, monsterLocation.x, monsterLocation.y);
	requestAnimationFrame(draw);
	
	// request animation frame goes through adn calls draw 60 times a second which draws the background image at 0, 0, the hero and the monster
}

draw();

